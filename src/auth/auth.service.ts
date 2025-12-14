import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(data: any) {
    const exists = await this.usersService.findByEmail(data.email);
    if (exists) throw new ConflictException('Email already registered');

    const hashed = await bcrypt.hash(data.password, 10);

    const user = await this.usersService.create({
      email: data.email,
      password: hashed,
    });

    return { message: 'User registered successfully' };
  }

  async login(data: any) {
    console.log("🔥 Trying login with email:", data.email);
  
    // Show ALL users in database
    const allUsers = await this.usersService.findAll?.() || await (this as any).prisma?.user.findMany?.();
    console.log("🔥 ALL USERS IN DB:", allUsers);
  
    const user = await this.usersService.findByEmail(data.email);
    console.log("🔥 USER FOUND:", user);
  
    if (!user) {
      console.log("❌ No user found → Invalid credentials");
      throw new UnauthorizedException('Invalid credentials');
    }
  
    const isMatch = await bcrypt.compare(data.password, user.password);
    console.log("🔥 PASSWORD MATCH:", isMatch);
  
    if (!isMatch) {
      console.log("❌ Password mismatch → Invalid credentials");
      throw new UnauthorizedException('Invalid credentials');
    }
  
    const token = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
  
    console.log("✅ LOGIN SUCCESS → Token generated");
    return { access_token: token };
  }
}  