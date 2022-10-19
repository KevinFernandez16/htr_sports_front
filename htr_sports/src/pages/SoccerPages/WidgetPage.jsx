import { MainLayout } from "../mainLayout";
import LiveScoreWidget from "../../components/LiveScoreWidget";

const WidgetPage = () => {
  return (
    <div className="page">
      <MainLayout>
        <div>
          <LiveScoreWidget></LiveScoreWidget>
        </div>
      </MainLayout>
    </div>
  );
};

export default WidgetPage;
