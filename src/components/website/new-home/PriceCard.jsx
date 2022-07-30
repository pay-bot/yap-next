function PriceCard({ title, description }) {
  return (
    <div className="border min-w-[80vw] sm:min-w-[400px] md:min-w-full group even:bg-primary even:text-white flex flex-col items-center rounded-xl shadow-borderShadow">
      <h4 className="mt-6 font-bold text-2xl">{title}</h4>
      <div className="prose lg:prose-base prose-sm prose-slate  even:prose-stone">{description}</div>
      <button type="button" className="primary-button mt-9 mb-8 group-even:primary-button-white rounded-lg">
        Order Now
      </button>
    </div>
  );
}

export default PriceCard;
