export class User {
  constructor(
    private uuid?: string,
    private name?: string,
    private email?: string,
    private senha?: string,
    private nomeEmpresa?: string,
    private tipo?: 'candidato' | 'admin' | 'recrutador',
  ) { }

  isAdmin(): Boolean {
    return this.tipo === 'admin';
  }

  isRecrutador(): Boolean {
    return this.tipo === 'recrutador';
  }

  getUuid(): string {
    return this.uuid as string;
  }

  toJson(): User {
    return new User(
      this.uuid,
      this.name,
      this.email,
      undefined,
      this.nomeEmpresa,
      this.tipo,
    );
  }
}
