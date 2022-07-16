import * as trpc from '@trpc/server';
import { z } from 'zod';
import { prisma } from '@/backend/router/utils/prisma';
import { PokemonClient } from 'pokenode-ts';

export const appRouter = trpc
	.router()
	.query('get-pokemon-by-id', {
		input: z.object({ id: z.number() }),
		async resolve({ input }) {
			const api = new PokemonClient();

			const pokemon = await api.getPokemonById(input.id);
			return { name: pokemon.name, sprites: pokemon.sprites };
		},
	})
	.mutation('cast-vote', {
		input: z.object({
			votedFor: z.number(),
			votedAgainst: z.number(),
		}),
		async resolve({ input }) {
			const voteInDb = await prisma.vote.create({
				data: {
					votedAgainstId: input.votedAgainst,
					votedForId: input.votedFor,
				},
			});
			return { success: true, vote: voteInDb };
		},
	});

// export type definition of API
export type AppRouter = typeof appRouter;
