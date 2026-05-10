import VideoContent from "@/src/components/modules/main/Movie/VideoContent";
import { checkUserSubscription } from "@/src/libs/service/services";
import { notFound } from "next/navigation";

async function page() {
  const subscription = await checkUserSubscription();

  if (!subscription.hasSubscription) {
    notFound();
  }

  return (
    <div className="flex container pt-24 pb-20 gap-x-8 min-h-screen">
      <VideoContent />
    </div>
  );
}

export default page;
