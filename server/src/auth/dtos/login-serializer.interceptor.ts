import { Expose } from 'class-transformer'
import { Role } from 'src/roles/enums/role.enum'
import { TaskInterface } from 'src/tasks/types/task.interface'

export class LoginSerializeDto {
    @Expose()
    companyId: string

    @Expose()
    companyName: string

    @Expose()
    userId: string

    @Expose()
    username: string

    @Expose()
    email: string

    @Expose()
    roles: Role[]

    @Expose()
    authToken: string

    @Expose()
    refreshToken: string

    @Expose()
    assignedTasks: TaskInterface[]

    @Expose()
    colorMode: 'light' | 'dark' | ''

    @Expose()
    firstName: string

    @Expose()
    lastName: string
}
