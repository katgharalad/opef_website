'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

interface Image {
	src: string;
	alt?: string;
	text?: string;
	isCenter?: boolean;
	customContent?: React.ReactNode;
}

interface ZoomParallaxProps {
	/** Array of images to be displayed in the parallax effect max 7 images */
	images: Image[];
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
	const container = useRef(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start start', 'end end'],
	});

	const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
	const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
	const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
	const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
	const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

	const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

	return (
		<div ref={container} className="relative h-[300vh]">
			<div className="sticky top-0 h-screen overflow-hidden">
				{images.map(({ src, alt, text, isCenter, customContent }, index) => {
					const scale = scales[index % scales.length];

					return (
						<motion.div
							key={index}
							style={{ scale }}
							className={`absolute top-0 flex h-full w-full items-center justify-center ${index === 1 ? '[&>div]:!top-[15vh] [&>div]:!left-[8vw] [&>div]:!h-[15vh] [&>div]:!w-[18vw]' : ''} ${index === 2 ? '[&>div]:!top-[25vh] [&>div]:!right-[12vw] [&>div]:!h-[12vh] [&>div]:!w-[15vw]' : ''} ${index === 3 ? '[&>div]:!bottom-[20vh] [&>div]:!left-[15vw] [&>div]:!h-[14vh] [&>div]:!w-[16vw]' : ''} ${index === 4 ? '[&>div]:!top-[50%] [&>div]:!left-[50%] [&>div]:!transform [&>div]:!-translate-x-1/2 [&>div]:!-translate-y-1/2 [&>div]:!h-[20vh] [&>div]:!w-[25vw]' : ''} ${index === 5 ? '[&>div]:!bottom-[30vh] [&>div]:!right-[8vw] [&>div]:!h-[13vh] [&>div]:!w-[17vw]' : ''} ${index === 6 ? '[&>div]:!top-[35vh] [&>div]:!left-[60%] [&>div]:!transform [&>div]:!-translate-x-1/2 [&>div]:!h-[11vh] [&>div]:!w-[14vw]' : ''} ${index === 0 ? '[&>div]:!top-[65vh] [&>div]:!right-[20vw] [&>div]:!transform [&>div]:!-translate-y-1/2 [&>div]:!h-[10vh] [&>div]:!w-[13vw]' : ''} `}
						>
							<div className="relative h-[25vh] w-[25vw]">
								{/* Text overlay for non-center images */}
								{text && !isCenter && (
									<div className="absolute inset-0 flex items-center justify-center">
										<h3 className={`text-white font-medium font-clash tracking-[0.15em] drop-shadow-2xl opacity-90 ${
											index === 1 ? 'text-5xl' : 
											index === 2 ? 'text-3xl' : 
											index === 3 ? 'text-4xl' : 
											index === 5 ? 'text-3xl' : 
											index === 6 ? 'text-2xl' : 
											index === 0 ? 'text-xl' : 'text-4xl'
										}`}>
											{text}
										</h3>
									</div>
								)}
								
								{/* Custom content for center image */}
								{isCenter && customContent && (
									<div className="absolute inset-0 flex items-center justify-center">
										{customContent}
									</div>
								)}
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}
