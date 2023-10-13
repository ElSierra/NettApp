import ViewOutletsSVG from "../assets/images/ViewOutlets.svg";
import CreateOutletsSVG from "../assets/images/CreateOutlet.svg";
import CompletedVisitsSVG from "../assets/images/CompletedVisits.svg";
import ScheduledVisitsSVG from "../assets/images/ScheduledVisits.svg";
import ViewProductsSVG from "../assets/images/ViewProducts.svg";
import CompetitionReviewSVG from "../assets/images/CompetitionReview.svg";
import DownloadScheduleSVG from "../assets/images/DownloadSchedule.svg";

export function generateIcon(route: string) {
  switch (route) {
    case "View Outlets":
      return <ViewOutletsSVG width={"20%"} height={32} />;
    case "Create a New Outlet":
      return <CreateOutletsSVG width={"20%"} height={32} />;
    case "Completed Visits":
      return <CompletedVisitsSVG width={"20%"} height={32} />;
    case "Scheduled Visits":
      return <ScheduledVisitsSVG width={"20%"} height={32} />;
    case "View Products":
      return <ViewProductsSVG width={"20%"} height={32} />;
    case "Competition Review":
      return <CompetitionReviewSVG width={"20%"} height={32} />;
    case "Download Schedule":
      return <DownloadScheduleSVG width={"20%"} height={32} />;
  }
}
