import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

@Controller({
    path: 'auth',
    version: '2'
})
export class AuthenticationController {

    @Post('/')
    @ApiResponse({ status: 200, description: 'Hello world application' })
    async login(@Body() body) {
        return {
            ...body
        }
    }

}
