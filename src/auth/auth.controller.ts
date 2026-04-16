import { Controller, Post, Body } from '@nestjs/common';

@Controller('api/auth')
export class AuthController {
  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    console.log('Connexion tenté:', body.email);
    
    if (body.email === 'test@ledelice.com' && body.password === '123456') {
      return {
        success: true,
        token: 'jwt-token-xyz-123',
        user: { id: '1', email: 'test@ledelice.com', name: 'Test User' }
      };
    }
    return { success: false, message: 'Email ou mot de passe incorrect' };
  }
}