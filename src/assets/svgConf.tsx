"use client";

//--------general -------------
// AI Icons
import ChatBotAmico from "@/assets/svg/general/bots/Chat bot-amico.svg";
import ChatBotPana from "@/assets/svg/general/bots/Chat bot-pana.svg";
import ChatBotRafiki from "@/assets/svg/general/bots/Chat bot-rafiki.svg";
import DataExtractionBro from "@/assets/svg/general/bots/Data extraction-bro.svg";
// Success Icons
import AppreciationBro from "@/assets/svg/general/Appreciation-bro.svg";
import MailSentBro from "@/assets/svg/general/Mail sent-bro.svg";
import OkAmico from "@/assets/svg/general/Ok-amico.svg";
import OkBro from "@/assets/svg/general/Ok-bro.svg";
// Global Icons
import ConnectedWorldAmico from "@/assets/svg/general/Connected world-amico.svg";
import GrowthCurveAmico from "@/assets/svg/general/Growth curve-amico.svg";
import LiveCollaborationCuate from "@/assets/svg/general/Live collaboration-cuate.svg";
import LiveCollaborationPana from "@/assets/svg/general/Live collaboration-pana.svg";
// Empty Icons
import NoDataCuate from "@/assets/svg/general/No data-cuate.svg";
import NoDataPana from "@/assets/svg/general/No data-pana.svg";
import CuriousAmico from "@/assets/svg/general/Curious-amico.svg";
import CuriousRafiki from "@/assets/svg/general/Curious-rafiki.svg";
import LightHousePana from "@/assets/svg/general/Lighthouse-pana.svg";
import OuterSpacePana from "@/assets/svg/general/Outer space-pana.svg";
//eyes Icons
import EyseBro from "@/assets/svg/general/Eyes-bro.svg";
import EyesPana from "@/assets/svg/general/Eyes-pana.svg";

//--------highlights -------------
import CreativeTeamAmico from "@/assets/svg/highlights/Creative team-amico.svg";
import CreativeTeamCuate from "@/assets/svg/highlights/Creative team-cuate.svg";
import DepressionPana from "@/assets/svg/highlights/Depression-pana.svg";
import FeelingAngryCuate from "@/assets/svg/highlights/Feeling angry-cuate.svg";
import FeelingAngryPana from "@/assets/svg/highlights/Feeling angry-pana.svg";
import FeelingSorryBro from "@/assets/svg/highlights/Feeling sorry-bro.svg";
import GoodTeamBro from "@/assets/svg/highlights/Good team-bro.svg";
import GoodTeamRafiki from "@/assets/svg/highlights/Good team-rafiki.svg";
import PassionateAmico from "@/assets/svg/highlights/Passionate-amico.svg";
import PassionateBro from "@/assets/svg/highlights/Passionate-bro.svg";
import SelfConfidencePana from "@/assets/svg/highlights/Self confidence-pana.svg";
import SelfConfidenceRafiki from "@/assets/svg/highlights/Self confidence-rafiki.svg";
import SmileyFaceBro from "@/assets/svg/highlights/Smiley face-bro.svg";
import SuperThankYouAmico from "@/assets/svg/highlights/Super thank you-amico.svg";
import SuperThankYouBro from "@/assets/svg/highlights/Super thank you-bro.svg";

//--------Polls -------------
import CustomerSurveyAmico from "@/assets/svg/polls/Customer Survey-amico.svg";
import CustomerSurveyCuate from "@/assets/svg/polls/Customer Survey-cuate.svg";
import CustomerSurveyRafiki from "@/assets/svg/polls/Customer Survey-rafiki.svg";
import ProblemSolvingBro from "@/assets/svg/polls/Problem solving-bro.svg";
import ProblemSolvingCuate from "@/assets/svg/polls/Problem solving-cuate.svg";
import ProblemSolvingPana from "@/assets/svg/polls/Problem solving-pana.svg";
import SegmentCuate from "@/assets/svg/polls/Segment-cuate.svg";
import SegmentPana from "@/assets/svg/polls/Segment-pana.svg";
import SegmentRafiki from "@/assets/svg/polls/Segment-rafiki.svg";

//--------reviews -------------
import GoodTeamAmico from "@/assets/svg/reviews/Good team-amico.svg";
// import GoodTeamBro from "@/assets/svg/reviews/Good team-bro.svg";
import GoodTeamCuate from "@/assets/svg/reviews/Good team-cuate.svg";
import OnlineReviewPana from "@/assets/svg/reviews/Online Review-pana.svg";
import OnlineReviewRafiki from "@/assets/svg/reviews/Online Review-rafiki.svg";

export const svgConf = {
  general: {
    ai: [
      { name: "Chat bot-amico", src: ChatBotAmico },
      { name: "Chat bot-pana", src: ChatBotPana },
      { name: "Chat bot-rafiki", src: ChatBotRafiki },
      { name: "Data extraction-bro", src: DataExtractionBro },
    ],
    success: [
      { name: "Appreciation-bro", src: AppreciationBro },
      { name: "Mail sent-bro", src: MailSentBro },
      { name: "Ok-amico", src: OkAmico },
      { name: "Ok-bro", src: OkBro },
    ],
    global: [
      { name: "Connected world-amico", src: ConnectedWorldAmico },
      { name: "Growth curve-amico", src: GrowthCurveAmico },
      { name: "Live collaboration-cuate", src: LiveCollaborationCuate },
      { name: "Live collaboration-pana", src: LiveCollaborationPana },
    ],
    empty: [
      { name: "No data-cuate", src: NoDataCuate },
      { name: "No data-pana", src: NoDataPana },
      { name: "Curious Amico", src: CuriousAmico },
      { name: "Curious Rafiki", src: CuriousRafiki },
      { name: "Light House Pana", src: LightHousePana },
      { name: "Outer Space Pana", src: OuterSpacePana },
    ],
    eyes: [
      { name: "Eyse Bro", src: EyseBro },
      { name: "Eyes Pana", src: EyesPana },
    ],
  },
  highlights: [
    { name: "Smiley face-bro", src: SmileyFaceBro },
    { name: "Super thank you-bro", src: SuperThankYouBro },
    { name: "Creative team-cuate", src: CreativeTeamCuate },
    { name: "Self confidence-rafiki", src: SelfConfidenceRafiki },
    { name: "Depression-pana", src: DepressionPana },
    { name: "Feeling angry-cuate", src: FeelingAngryCuate },
    { name: "Passionate-amico", src: PassionateAmico },
    { name: "Feeling angry-pana", src: FeelingAngryPana },
    { name: "Feeling sorry-bro", src: FeelingSorryBro },
    { name: "Good team-bro", src: GoodTeamBro },
    { name: "Good team-rafiki", src: GoodTeamRafiki },
    { name: "Passionate-bro", src: PassionateBro },
    { name: "Self confidence-pana", src: SelfConfidencePana },
    { name: "Super thank you-amico", src: SuperThankYouAmico },
    { name: "Creative team-amico", src: CreativeTeamAmico },
  ],
  polls: [
    { name: "Customer Survey-amico", src: CustomerSurveyAmico },
    { name: "Customer Survey-cuate", src: CustomerSurveyCuate },
    { name: "Customer Survey-rafiki", src: CustomerSurveyRafiki },
    { name: "Problem solving-bro", src: ProblemSolvingBro },
    { name: "Problem solving-cuate", src: ProblemSolvingCuate },
    { name: "Problem solving-pana", src: ProblemSolvingPana },
    { name: "Segment-cuate", src: SegmentCuate },
    { name: "Segment-pana", src: SegmentPana },
    { name: "Segment-rafiki", src: SegmentRafiki },
  ],
  reviews: [
    { name: "Good team-amico", src: GoodTeamAmico },
    { name: "Good team-bro", src: GoodTeamBro },
    { name: "Good team-cuate", src: GoodTeamCuate },
    { name: "Online Review-pana", src: OnlineReviewPana },
    { name: "Online Review-rafiki", src: OnlineReviewRafiki },
  ],
};
