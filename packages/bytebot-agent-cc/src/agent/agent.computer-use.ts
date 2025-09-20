import {
  Button,
  Coordinates,
  Press,
  ComputerToolUseContentBlock,
  ToolResultContentBlock,
  MessageContentType,
  isScreenshotToolUseBlock,
  isCursorPositionToolUseBlock,
  isMoveMouseToolUseBlock,
  isTraceMouseToolUseBlock,
  isClickMouseToolUseBlock,
  isPressMouseToolUseBlock,
  isDragMouseToolUseBlock,
  isScrollToolUseBlock,
  isTypeKeysToolUseBlock,
  isPressKeysToolUseBlock,
  isTypeTextToolUseBlock,
  isWaitToolUseBlock,
  isApplicationToolUseBlock,
  isPasteTextToolUseBlock,
  isReadFileToolUseBlock,
} from '@bytebot/shared';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface DesktopCommandPayload {
  action: string;
  [key: string]: unknown;
}

interface ReadFileResult {
  success: boolean;
  data?: string;
  name?: string;
  size?: number;
  mediaType?: string;
  message?: string;
}

@Injectable()
export class DesktopComputerUseService {
  private readonly logger = new Logger(DesktopComputerUseService.name);
  private readonly baseUrl: string;

  constructor(private readonly configService: ConfigService) {
    const configuredUrl = this.configService.get<string>('BYTEBOT_DESKTOP_BASE_URL');
    if (!configuredUrl) {
      throw new Error('BYTEBOT_DESKTOP_BASE_URL is not configured');
    }

    const sanitizedUrl = configuredUrl.trim().replace(/\/+$, '');
    if (!sanitizedUrl) {
      throw new Error('BYTEBOT_DESKTOP_BASE_URL is empty after trimming');
    }

    this.baseUrl = sanitizedUrl;
  }

  async handleComputerToolUse(
    block: ComputerToolUseContentBlock,
    logger: Logger,
  ): Promise<ToolResultContentBlock> {
    logger.debug(
      `Handling computer tool use: ${block.name}, tool_use_id: ${block.id}`,
    );

    if (isScreenshotToolUseBlock(block)) {
      logger.debug('Processing screenshot request');
      try {
        logger.debug('Taking screenshot');
        const image = await this.screenshot();
        logger.debug('Screenshot captured successfully');

        return {
          type: MessageContentType.ToolResult,
          tool_use_id: block.id,
          content: [
            {
              type: MessageContentType.Image,
              source: {
                data: image,
                media_type: 'image/png',
                type: 'base64',
              },
            },
          ],
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        logger.error(`Screenshot failed: ${message}`, error instanceof Error ? error.stack : undefined);
        return {
          type: MessageContentType.ToolResult,
          tool_use_id: block.id,
          content: [
            {
              type: MessageContentType.Text,
              text: 'ERROR: Failed to take screenshot',
            },
          ],
          is_error: true,
        };
      }
    }

    if (isCursorPositionToolUseBlock(block)) {
      logger.debug('Processing cursor position request');
      try {
        logger.debug('Getting cursor position');
        const position = await this.cursorPosition();
        logger.debug(`Cursor position obtained: ${position.x}, ${position.y}`);

        return {
          type: MessageContentType.ToolResult,
          tool_use_id: block.id,
          content: [
            {
              type: MessageContentType.Text,
              text: `Cursor position: ${position.x}, ${position.y}`,
            },
          ],
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        logger.error(
          `Getting cursor position failed: ${message}`,
          error instanceof Error ? error.stack : undefined,
        );
        return {
          type: MessageContentType.ToolResult,
          tool_use_id: block.id,
          content: [
            {
              type: MessageContentType.Text,
              text: 'ERROR: Failed to get cursor position',
            },
          ],
          is_error: true,
        };
      }
    }

    try {
      if (isMoveMouseToolUseBlock(block)) {
        await this.moveMouse(block.input);
      }
      if (isTraceMouseToolUseBlock(block)) {
        await this.traceMouse(block.input);
      }
      if (isClickMouseToolUseBlock(block)) {
        await this.clickMouse(block.input);
      }
      if (isPressMouseToolUseBlock(block)) {
        await this.pressMouse(block.input);
      }
      if (isDragMouseToolUseBlock(block)) {
        await this.dragMouse(block.input);
      }
      if (isScrollToolUseBlock(block)) {
        await this.scroll(block.input);
      }
      if (isTypeKeysToolUseBlock(block)) {
        await this.typeKeys(block.input);
      }
      if (isPressKeysToolUseBlock(block)) {
        await this.pressKeys(block.input);
      }
      if (isTypeTextToolUseBlock(block)) {
        await this.typeText(block.input);
      }
      if (isPasteTextToolUseBlock(block)) {
        await this.pasteText(block.input);
      }
      if (isWaitToolUseBlock(block)) {
        await this.wait(block.input);
      }
      if (isApplicationToolUseBlock(block)) {
        await this.application(block.input);
      }
      if (isReadFileToolUseBlock(block)) {
        logger.debug(`Reading file: ${block.input.path}`);
        const result = await this.readFile(block.input);

        if (result.success && result.data) {
          return {
            type: MessageContentType.ToolResult,
            tool_use_id: block.id,
            content: [
              {
                type: MessageContentType.Document,
                source: {
                  type: 'base64',
                  media_type: result.mediaType || 'application/octet-stream',
                  data: result.data,
                },
                name: result.name || 'file',
                size: result.size,
              },
            ],
          };
        }

        return {
          type: MessageContentType.ToolResult,
          tool_use_id: block.id,
          content: [
            {
              type: MessageContentType.Text,
              text: result.message || 'Error reading file',
            },
          ],
          is_error: true,
        };
      }

      let image: string | null = null;
      try {
        const delayMs = 750;
        logger.debug(`Waiting ${delayMs}ms before taking screenshot`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));

        logger.debug('Taking screenshot');
        image = await this.screenshot();
        logger.debug('Screenshot captured successfully');
      } catch (error) {
        this.logError('Failed to take screenshot after tool execution', error);
      }

      logger.debug(`Tool execution successful for tool_use_id: ${block.id}`);
      const toolResult: ToolResultContentBlock = {
        type: MessageContentType.ToolResult,
        tool_use_id: block.id,
        content: [
          {
            type: MessageContentType.Text,
            text: 'Tool executed successfully',
          },
        ],
      };

      if (image) {
        toolResult.content.push({
          type: MessageContentType.Image,
          source: {
            data: image,
            media_type: 'image/png',
            type: 'base64',
          },
        });
      }

      return toolResult;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      logger.error(
        `Error executing ${block.name} tool: ${message}`,
        error instanceof Error ? error.stack : undefined,
      );
      return {
        type: MessageContentType.ToolResult,
        tool_use_id: block.id,
        content: [
          {
            type: MessageContentType.Text,
            text: `Error executing ${block.name} tool: ${message}`,
          },
        ],
        is_error: true,
      };
    }
  }

  async writeFile(input: {
    path: string;
    content: string;
  }): Promise<{ success: boolean; message?: string }> {
    this.logger.debug(`Writing file: ${input.path}`);

    try {
      const response = await this.postDesktopCommand({
        action: 'write_file',
        path: input.path,
        data: input.content,
      });

      const data = (await response.json()) as { success: boolean; message?: string };
      return data;
    } catch (error) {
      this.logError('Error in write_file action', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        message: `Error writing file: ${message}`,
      };
    }
  }

  private async postDesktopCommand(
    payload: DesktopCommandPayload,
  ): Promise<Response> {
    try {
      const response = await fetch(`${this.baseUrl}/computer-use`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let details = '';
        try {
          const text = await response.text();
          if (text) {
            details = ` - ${text}`;
          }
        } catch {
          // Ignore errors when trying to read the response body for logging
        }

        throw new Error(
          `Desktop action "${payload.action}" failed with status ${response.status} ${response.statusText}${details}`,
        );
      }

      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Desktop action "${payload.action}" failed: ${error.message}`,
          {
            cause: error,
          },
        );
      }

      throw error;
    }
  }

  private logError(context: string, error: unknown) {
    if (error instanceof Error) {
      this.logger.error(`${context}: ${error.message}`, error.stack);
    } else {
      this.logger.error(`${context}: ${String(error)}`);
    }
  }

  private async moveMouse(input: { coordinates: Coordinates }): Promise<void> {
    const { coordinates } = input;
    this.logger.debug(
      `Moving mouse to coordinates: [${coordinates.x}, ${coordinates.y}]`,
    );

    try {
      await this.postDesktopCommand({
        action: 'move_mouse',
        coordinates,
      });
    } catch (error) {
      this.logError('Error in move_mouse action', error);
      throw error;
    }
  }

  private async traceMouse(input: {
    path: Coordinates[];
    holdKeys?: string[];
  }): Promise<void> {
    const { path, holdKeys } = input;
    this.logger.debug(
      `Tracing mouse to path: ${JSON.stringify(path)}${
        holdKeys ? ` with holdKeys: ${holdKeys}` : ''
      }`,
    );

    try {
      await this.postDesktopCommand({
        action: 'trace_mouse',
        path,
        holdKeys,
      });
    } catch (error) {
      this.logError('Error in trace_mouse action', error);
      throw error;
    }
  }

  private async clickMouse(input: {
    coordinates?: Coordinates;
    button: Button;
    holdKeys?: string[];
    clickCount: number;
  }): Promise<void> {
    const { coordinates, button, holdKeys, clickCount } = input;
    this.logger.debug(
      `Clicking mouse ${button} ${clickCount} times ${
        coordinates ? `at coordinates: [${coordinates.x}, ${coordinates.y}] ` : ''
      }${holdKeys ? `with holdKeys: ${holdKeys}` : ''}`,
    );

    try {
      await this.postDesktopCommand({
        action: 'click_mouse',
        coordinates,
        button,
        holdKeys: holdKeys && holdKeys.length > 0 ? holdKeys : undefined,
        clickCount,
      });
    } catch (error) {
      this.logError('Error in click_mouse action', error);
      throw error;
    }
  }

  private async pressMouse(input: {
    coordinates?: Coordinates;
    button: Button;
    press: Press;
  }): Promise<void> {
    const { coordinates, button, press } = input;
    this.logger.debug(
      `Pressing mouse ${button} ${press} ${
        coordinates ? `at coordinates: [${coordinates.x}, ${coordinates.y}]` : ''
      }`,
    );

    try {
      await this.postDesktopCommand({
        action: 'press_mouse',
        coordinates,
        button,
        press,
      });
    } catch (error) {
      this.logError('Error in press_mouse action', error);
      throw error;
    }
  }

  private async dragMouse(input: {
    path: Coordinates[];
    button: Button;
    holdKeys?: string[];
  }): Promise<void> {
    const { path, button, holdKeys } = input;
    this.logger.debug(
      `Dragging mouse to path: ${JSON.stringify(path)}${
        holdKeys ? ` with holdKeys: ${holdKeys}` : ''
      }`,
    );

    try {
      await this.postDesktopCommand({
        action: 'drag_mouse',
        path,
        button,
        holdKeys: holdKeys && holdKeys.length > 0 ? holdKeys : undefined,
      });
    } catch (error) {
      this.logError('Error in drag_mouse action', error);
      throw error;
    }
  }

  private async scroll(input: {
    coordinates?: Coordinates;
    direction: 'up' | 'down' | 'left' | 'right';
    scrollCount: number;
    holdKeys?: string[];
  }): Promise<void> {
    const { coordinates, direction, scrollCount, holdKeys } = input;
    this.logger.debug(
      `Scrolling ${direction} ${scrollCount} times ${
        coordinates ? `at coordinates: [${coordinates.x}, ${coordinates.y}]` : ''
      }`,
    );

    try {
      await this.postDesktopCommand({
        action: 'scroll',
        coordinates,
        direction,
        scrollCount,
        holdKeys: holdKeys && holdKeys.length > 0 ? holdKeys : undefined,
      });
    } catch (error) {
      this.logError('Error in scroll action', error);
      throw error;
    }
  }

  private async typeKeys(input: {
    keys: string[];
    delay?: number;
  }): Promise<void> {
    const { keys, delay } = input;
    this.logger.debug(`Typing keys: ${keys.join(',')}`);

    try {
      await this.postDesktopCommand({
        action: 'type_keys',
        keys,
        delay,
      });
    } catch (error) {
      this.logError('Error in type_keys action', error);
      throw error;
    }
  }

  private async pressKeys(input: {
    keys: string[];
    press: Press;
  }): Promise<void> {
    const { keys, press } = input;
    this.logger.debug(`Pressing keys: ${keys.join(',')}`);

    try {
      await this.postDesktopCommand({
        action: 'press_keys',
        keys,
        press,
      });
    } catch (error) {
      this.logError('Error in press_keys action', error);
      throw error;
    }
  }

  private async typeText(input: {
    text: string;
    delay?: number;
  }): Promise<void> {
    const { text, delay } = input;
    this.logger.debug(`Typing text: ${text}`);

    try {
      await this.postDesktopCommand({
        action: 'type_text',
        text,
        delay,
      });
    } catch (error) {
      this.logError('Error in type_text action', error);
      throw error;
    }
  }

  private async pasteText(input: { text: string }): Promise<void> {
    const { text } = input;
    this.logger.debug(`Pasting text: ${text}`);

    try {
      await this.postDesktopCommand({
        action: 'paste_text',
        text,
      });
    } catch (error) {
      this.logError('Error in paste_text action', error);
      throw error;
    }
  }

  private async wait(input: { duration: number }): Promise<void> {
    const { duration } = input;
    this.logger.debug(`Waiting for ${duration}ms`);

    try {
      await this.postDesktopCommand({
        action: 'wait',
        duration,
      });
    } catch (error) {
      this.logError('Error in wait action', error);
      throw error;
    }
  }

  private async cursorPosition(): Promise<Coordinates> {
    this.logger.debug('Getting cursor position');

    try {
      const response = await this.postDesktopCommand({ action: 'cursor_position' });

      const data = (await response.json()) as {
        x?: unknown;
        y?: unknown;
      };

      if (typeof data?.x !== 'number' || typeof data?.y !== 'number') {
        throw new Error('Invalid cursor position response received from desktop');
      }

      return { x: data.x, y: data.y };
    } catch (error) {
      this.logError('Error in cursor_position action', error);
      throw error;
    }
  }

  private async screenshot(): Promise<string> {
    this.logger.debug('Taking screenshot');

    try {
      const requestBody = {
        action: 'screenshot',
      };

      const response = await this.postDesktopCommand(requestBody);

      const data = (await response.json()) as { image?: unknown };

      if (typeof data.image !== 'string' || data.image.length === 0) {
        throw new Error('Failed to take screenshot: No image data received');
      }

      return data.image;
    } catch (error) {
      this.logError('Error in screenshot action', error);
      throw error;
    }
  }

  private async application(input: { application: string }): Promise<void> {
    const { application } = input;
    this.logger.debug(`Opening application: ${application}`);

    try {
      await this.postDesktopCommand({
        action: 'application',
        application,
      });
    } catch (error) {
      this.logError('Error in application action', error);
      throw error;
    }
  }

  private async readFile(input: { path: string }): Promise<ReadFileResult> {
    const { path } = input;
    this.logger.debug(`Reading file: ${path}`);

    try {
      const response = await this.postDesktopCommand({
        action: 'read_file',
        path,
      });

      const data = (await response.json()) as ReadFileResult;
      return data;
    } catch (error) {
      this.logError('Error in read_file action', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        message: `Error reading file: ${message}`,
      };
    }
  }
}
