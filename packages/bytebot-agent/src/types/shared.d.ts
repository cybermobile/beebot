declare module '@bytebot/shared' {
  export enum MessageContentType {
    Text = 'text',
    Image = 'image',
    Document = 'document',
    ToolUse = 'tool_use',
    ToolResult = 'tool_result',
    Thinking = 'thinking',
    RedactedThinking = 'redacted_thinking',
    UserAction = 'user_action',
  }
  export type MessageContentBlock = any;
  export type TextContentBlock = any;
  export type ToolUseContentBlock = any;
  export type ToolResultContentBlock = any;
  export type ThinkingContentBlock = any;
  export const isUserActionContentBlock: any;
  export const isComputerToolUseContentBlock: any;
  export const isImageContentBlock: any;
}
