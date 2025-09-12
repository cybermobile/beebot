import { OpenAIService } from './openai.service';
import { ConfigService } from '@nestjs/config';

jest.mock(
  '@bytebot/shared',
  () => ({
    MessageContentType: { Text: 'text', ToolUse: 'tool_use' },
    isUserActionContentBlock: jest.fn(),
    isComputerToolUseContentBlock: jest.fn(),
    isImageContentBlock: jest.fn(),
  }),
  { virtual: true },
);

jest.mock('@prisma/client', () => ({}), { virtual: true });
describe('OpenAIService formatOpenAIResponse', () => {
  let service: OpenAIService;

  beforeEach(() => {
    service = new OpenAIService(new ConfigService());
  });

  it('parses valid tool call arguments', () => {
    const output = service['formatOpenAIResponse']([
      {
        type: 'function_call',
        call_id: '1',
        name: 'testTool',
        arguments: '{"foo":"bar"}',
      } as any,
    ]);

    expect(output).toEqual([
      {
        type: 'tool_use',
        id: '1',
        name: 'testTool',
        input: { foo: 'bar' },
      },
    ]);
  });

  it('logs warning and returns fallback block for invalid JSON', () => {
    const warnSpy = jest.spyOn((service as any).logger, 'warn');

    const output = service['formatOpenAIResponse']([
      {
        type: 'function_call',
        call_id: '2',
        name: 'badTool',
        arguments: '{invalid}',
      } as any,
    ]);

    expect(warnSpy).toHaveBeenCalled();
    expect(output).toEqual([
      {
        type: 'text',
        text: 'Invalid tool call arguments: {invalid}',
      },
    ]);
  });
});

