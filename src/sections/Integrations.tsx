import Tag from "@/components/Tag";
// Note: You should update these icon imports to point to Amazon, Kindle, etc.
import figmaIcon from "@/assets/images/figma-logo.svg"; 
import notionIcon from "@/assets/images/notion-logo.svg";
import slackIcon from "@/assets/images/slack-logo.svg";
import relumeIcon from "@/assets/images/relume-logo.svg";
import framerIcon from "@/assets/images/framer-logo.svg";
import githubIcon from "@/assets/images/github-logo.svg";

const platforms = [
    {
        name: "Kindle",
        icon: figmaIcon, // Replace with Kindle icon
        description: "Read the ebook instantly.",
    },
    {
        name: "Audible",
        icon: notionIcon, // Replace with Audible icon
        description: "Listen to the immersive narration.",
    },
    {
        name: "Paperback",
        icon: slackIcon, // Replace with Amazon icon
        description: "Get the physical copy.",
    },
    {
        name: "Goodreads",
        icon: relumeIcon, // Replace with Goodreads icon
        description: "Join the discussion.",
    },
    {
        name: "Apple Books",
        icon: framerIcon, 
        description: "Available on iPhone & iPad.",
    },
    {
        name: "Hardcover",
        icon: githubIcon,
        description: "Collector's edition available.",
    },
];

export type IntegrationsType = typeof platforms;

export default function Integrations() {
    return (
        <section className="py-24 overflow-hidden " id="integrations">
            <div className="container">
                <div className="grid lg:grid-cols-2 items-center lg:gap-16">
                    <div>
                        <Tag>Availability</Tag>
                        <h2 className="text-6xl font-medium mt-6 tracking-tighter">
                            Read it <span className="text-red-600">Anywhere</span>
                        </h2>

                        <p className="text-neutral-500 mt-4 text-lg leading-relaxed">
                            HUNTED is available across all major formats. Whether you prefer digital, audio, or the weight of a book in your hands, the nightmare is ready for you.
                        </p>
                    </div>
                    
                    </div>
                </div>
            
        </section>
    );
}