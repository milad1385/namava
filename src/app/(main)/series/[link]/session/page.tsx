import VideoContent from "@/src/components/modules/main/Movie/VideoContent";
import { checkUserSubscription } from "@/src/libs/service/services";
import { notFound } from "next/navigation";

async function page() {
  const subscription = await checkUserSubscription();

  if (!subscription.hasSubscription) {
    notFound();
  }

  return (
    <div className="my-28 container px-2">
      <VideoContent />
    </div>
  );
}

export default page;
