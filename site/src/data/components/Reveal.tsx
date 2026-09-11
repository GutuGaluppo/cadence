import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type RevealTag = "div" | "section" | "article";

type RevealProps = {
	children: ReactNode;
	delay?: number;
	className?: string;
	as?: RevealTag;
	id?: string;
};

const tagMap = {
	div: motion.div,
	section: motion.section,
	article: motion.article,
} as const;

export function Reveal({ children, delay = 0, className, as = "div", id }: RevealProps) {
	const shouldReduceMotion = useReducedMotion();
	const MotionTag = tagMap[as];

	if (shouldReduceMotion) {
		const Tag = as;
		return (
			<Tag className={className} id={id}>
				{children}
			</Tag>
		);
	}

	return (
		<MotionTag
			className={className}
			id={id}
			initial={{ opacity: 0, y: 26 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-80px" }}
			transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
		>
			{children}
		</MotionTag>
	);
}
