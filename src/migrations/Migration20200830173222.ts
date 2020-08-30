import { Migration } from '@mikro-orm/migrations';

export class Migration20200830173222 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "team" ("id" serial primary key, "name" varchar(255) not null, "wins" int4 not null, "losses" int4 not null);');
  }

}
