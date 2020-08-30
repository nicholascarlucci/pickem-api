import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
@Entity()
export class Team {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property()
  name: string;

  @Field(() => Int)
  @Property()
  wins: number;

  @Field(() => Int)
  @Property()
  losses: number;
}
