import * as bcrypt from 'bcrypt';

export async function hashValue(value: string): Promise<string> {
  return await bcrypt.hash(value, 10);
}

export async function verifyHash(pass: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(pass, hash);
}
