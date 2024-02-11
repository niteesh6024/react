//default export - default import - no need to match the function name
import Niteesh from './firstComponent'
import SecondComponent from './secondComponent'
import ThirdComponent from './thirdComponent'
import FourthComponent from './fourthcomponent'
// named import - the function name should match
import {FifthComponent} from './firstComponent'


export default function LearningComponent() {
    return (
      <div className="App">
        <Niteesh/>
        <SecondComponent></SecondComponent>
        <ThirdComponent />
        <FourthComponent></FourthComponent>
        <FifthComponent/>
      </div>
    );
  }