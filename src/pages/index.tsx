import { getOptionsForVote } from '@/utils/getRandomPokemon';
import { trpc } from '@/utils/trpc';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

const Home: NextPage = () => {
	const [ids, updateIds] = useState(() => getOptionsForVote());

	const [first, second] = ids;

	const firstPokemon: any = trpc.useQuery(['get-pokemon-by-id', { id: first }]);
	const secondPokemon: any = trpc.useQuery(['get-pokemon-by-id', { id: second }]);

	if (firstPokemon.isLoading || secondPokemon.isLoading) return null;

	return (
		<div className='h-screen w-screen flex flex-col justify-center items-center'>
			<div className='text-2xl text-center'>Which Pokemon is Rounder?</div>
			<div className='p-2' />
			<div className='border rounded p-8 flex justify-between items-center max-w-2xl'>
				<div className='w-64 h-64 flex flex-col'>
					<img src={firstPokemon.data?.sprites.front_default} alt={firstPokemon.data?.name} className='w-full' />
					<div className='text-xl text-center capitalize mt-[-2rem]'>{firstPokemon.data?.name}</div>
				</div>
				<div className='p-8'>VS</div>
				<div className='w-64 h-64 flex flex-col '>
					<img src={secondPokemon.data?.sprites.front_default} alt={secondPokemon.data?.name} className='w-full' />
					<div className='text-xl text-center capitalize mt-[-2rem]'>{secondPokemon.data?.name}</div>
				</div>
				<div className='p-2' />
			</div>
		</div>
	);
};

export default Home;
