import { mergeStyleSets } from "@fluentui/react";

const classNames = mergeStyleSets({
	aboutHeader: {
		paddingLeft: "2em",
	},
});

const About = () => {
	return (
		<div className={classNames.aboutHeader}>
			<h1>About</h1>
			<p>
				This is a simple worry tracking app. You can add, edit, and
				delete worries.
			</p>
		</div>
	);
};

export default About;
