import { TaskAuditLogs } from '@/entities'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import type { CreateTaskLogDTO } from './dto'

@Injectable()
export class TaskLogsService {
  constructor(
    @InjectRepository(TaskAuditLogs)
    private readonly _logsRepository: Repository<TaskAuditLogs>,
  ) {}

  async log(data: CreateTaskLogDTO): Promise<void> {
    const newLog = this._logsRepository.create({ ...data })
    await this._logsRepository.save(newLog)
  }
}
