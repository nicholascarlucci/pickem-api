import { Resolver, Query, Ctx, Mutation, Arg, Int } from 'type-graphql';
import { Team } from '../entities/Team';
import { MyContext } from '../types';

@Resolver()
export class TeamResolver {
  @Query(() => [Team])
  teams(@Ctx() { em }: MyContext): Promise<Team[]> {
    return em.find(Team, {});
  }

  @Query(() => Team, { nullable: true })
  team(
    @Arg('id', () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<Team | null> {
    return em.findOne(Team, { id });
  }

  @Mutation(() => Team)
  async createTeam(
    @Arg('name') name: string,
    @Ctx() { em }: MyContext
  ): Promise<Team> {
    const team = em.create(Team, { name, wins: 0, losses: 0 });
    await em.persistAndFlush(team);
    return team;
  }

  @Mutation(() => Team, { nullable: true })
  async updateTeam(
    @Arg('id') id: number,
    @Arg('name') name: string,
    @Arg('wins', () => Int, { nullable: true }) wins: number,
    @Arg('losses', () => Int, { nullable: true }) losses: number,
    @Ctx() { em }: MyContext
  ): Promise<Team | null> {
    const team = await em.findOne(Team, { id });
    if (!team) {
      return null;
    }
    if (typeof name !== undefined) {
      team.name = name;
    }
    if (typeof wins !== undefined) {
      team.wins = wins;
    }
    if (typeof losses !== undefined) {
      team.losses = losses;
    }
    await em.persistAndFlush(team);
    return team;
  }

  @Mutation(() => Boolean)
  async deleteTeam(
    @Arg('id') id: number,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    await em.nativeDelete(Team, { id });
    return true;
  }
}
