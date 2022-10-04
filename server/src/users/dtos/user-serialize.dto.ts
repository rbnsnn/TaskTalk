import { Expose } from 'class-transformer';

export class UserSerializeDto {
    @Expose()
    companyId: string;

    @Expose()
    companyName: string;

    @Expose()
    userId: string;

    @Expose()
    username: string;

    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    phoneNumber: string;

    @Expose()
    roles: string[];

    @Expose()
    email: string;
}
