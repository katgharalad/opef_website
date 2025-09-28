import {
	FacebookIcon,
	GithubIcon,
	Grid2X2Plus,
	InstagramIcon,
	LinkedinIcon,
	TwitterIcon,
	YoutubeIcon,
	Mail,
	Phone,
	MapPin,
	Shield,
	FileText,
	Users,
} from 'lucide-react';

export function MinimalFooter() {
	const year = new Date().getFullYear();

	const company = [
		{
			title: 'About OPEF',
			href: '#',
		},
		{
			title: 'Careers',
			href: '#',
		},
		{
			title: 'Press Kit',
			href: '#',
		},
		{
			title: 'Privacy Policy',
			href: '#',
		},
		{
			title: 'Terms of Service',
			href: '#',
		},
	];

	const resources = [
		{
			title: 'Documentation',
			href: '#',
		},
		{
			title: 'API Reference',
			href: '#',
		},
		{
			title: 'Support Center',
			href: '#',
		},
		{
			title: 'Compliance Guide',
			href: '#',
		},
		{
			title: 'Security',
			href: '#',
		},
	];

	const socialLinks = [
		{
			icon: <LinkedinIcon className="size-4" />,
			link: '#',
		},
		{
			icon: <TwitterIcon className="size-4" />,
			link: '#',
		},
		{
			icon: <GithubIcon className="size-4" />,
			link: '#',
		},
		{
			icon: <Mail className="size-4" />,
			link: 'mailto:contact@opef.ai',
		},
	];

	return (
		<footer className="relative bg-black border-t border-white/10">
			<div className="bg-[radial-gradient(35%_80%_at_30%_0%,rgba(255,255,255,0.1),transparent)] mx-auto max-w-6xl">
				<div className="bg-white/10 absolute inset-x-0 h-px w-full" />
				<div className="grid max-w-6xl grid-cols-6 gap-8 p-8">
					<div className="col-span-6 flex flex-col gap-6 md:col-span-4">
						<div className="flex items-center gap-3">
							<div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
								<Grid2X2Plus className="size-5 text-white" />
							</div>
							<span className="text-2xl font-bold text-white font-clash">OPEF</span>
						</div>
						<p className="text-white/70 max-w-md font-clash text-base leading-relaxed">
							Open Platform for Environmental Frameworks. Automating compliance analysis, reporting, and regulatory guidance with AI-powered precision.
						</p>
						<div className="flex gap-3">
							{socialLinks.map((item, i) => (
								<a
									key={i}
									className="hover:bg-white/10 rounded-lg border border-white/20 p-2.5 transition-colors duration-200"
									target="_blank"
									href={item.link}
								>
									{item.icon}
								</a>
							))}
						</div>
					</div>
					<div className="col-span-3 w-full md:col-span-1">
						<span className="text-white/60 mb-3 text-sm font-clash font-medium uppercase tracking-wide">
							Resources
						</span>
						<div className="flex flex-col gap-2">
							{resources.map(({ href, title }, i) => (
								<a
									key={i}
									className="w-max py-1 text-sm text-white/70 font-clash duration-200 hover:text-white hover:underline"
									href={href}
								>
									{title}
								</a>
							))}
						</div>
					</div>
					<div className="col-span-3 w-full md:col-span-1">
						<span className="text-white/60 mb-3 text-sm font-clash font-medium uppercase tracking-wide">Company</span>
						<div className="flex flex-col gap-2">
							{company.map(({ href, title }, i) => (
								<a
									key={i}
									className="w-max py-1 text-sm text-white/70 font-clash duration-200 hover:text-white hover:underline"
									href={href}
								>
									{title}
								</a>
							))}
						</div>
					</div>
				</div>
				<div className="bg-white/10 absolute inset-x-0 h-px w-full" />
				<div className="flex max-w-6xl flex-col justify-between gap-4 pt-6 pb-8 px-8">
					<div className="flex flex-col md:flex-row justify-between items-center gap-4">
						<p className="text-white/60 text-center font-clash text-sm">
							© {year} OPEF.ai. All rights reserved.
						</p>
						<div className="flex items-center gap-6 text-white/60">
							<div className="flex items-center gap-2">
								<Shield className="size-4" />
								<span className="text-sm font-clash">SOC 2 Compliant</span>
							</div>
							<div className="flex items-center gap-2">
								<FileText className="size-4" />
								<span className="text-sm font-clash">GDPR Ready</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
