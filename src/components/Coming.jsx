import { useRouter } from "next/router";
import SectionWrapper from "./layout/SectionWrapper";

export default function Coming() {
  const router = useRouter();

  return (
    <SectionWrapper>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img src="/yaplogofullblack.svg" alt="" className="w-28" />
        <h1 className="text-5xl">
          We are <b>Almost</b> there!
        </h1>
        <p>Stay tuned for something amazing!!!</p>

        <button
          type="button"
          className="py-5 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </SectionWrapper>
  );
}

