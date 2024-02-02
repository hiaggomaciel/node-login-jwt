import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email)

        if (user) {
            //Checar se a senha informada corresponde ao hash no db
    
            const isPasswordIsValid = await bcrypt.compare(password, user.password)
    
            if (isPasswordIsValid) {
                return{
                    ...user,
                    password: undefined,
                }
            }
        }
        throw new Error('Endereço de email ou senha estão incorretos.')
    }
}
