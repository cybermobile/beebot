import { Module } from '@nestjs/common';
import { TasksModule } from '../tasks/tasks.module';
import { MessagesModule } from '../messages/messages.module';
import { AgentProcessor } from './agent.processor';
import { ConfigModule } from '@nestjs/config';
import { AgentScheduler } from './agent.scheduler';
import { InputCaptureService } from './input-capture.service';
import { AgentAnalyticsService } from './agent.analytics';
import { DesktopComputerUseService } from './agent.computer-use';

@Module({
  imports: [ConfigModule, TasksModule, MessagesModule],
  providers: [
    AgentProcessor,
    AgentScheduler,
    InputCaptureService,
    AgentAnalyticsService,
    DesktopComputerUseService,
  ],
  exports: [AgentProcessor],
})
export class AgentModule {}
