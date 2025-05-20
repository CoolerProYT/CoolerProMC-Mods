export default function FeatureCard({img, title, description}) {
    return (
        <div className="md:w-[48%] lg:w-[31%] xl:w-[23%] mx-[1%] my-3 bg-neutral-800/75 rounded-lg shadow-lg p-5">
            <div>
                <div className="flex justify-center">
                    <img src={img} className="h-32 md:h-28 xl:h-32 w-auto"/>
                </div>
                <div className="mt-1">
                    <span className="text-xl font-semibold">{title}</span>
                </div>
            </div>
            <p className="mt-2 text-sm">{description}</p>
        </div>
    );
}