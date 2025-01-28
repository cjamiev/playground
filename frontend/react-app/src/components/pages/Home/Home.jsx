import Page from '../../layout/Page';
import { SCDescription, SCSectionWrapper, SCNoteTitle, SCNotesWrapper } from './styles';

/*
ToDo:
  - Form Validation Hook
  - lazy loading Example
  - Side Panel and Modal usage
  - Live coding: Add tabs, loading images, form validation
  - Add unit tests for examples
*/

const Home = () => {
  return (
    <Page sidePanelContent={<div>Testing</div>}>
      <SCDescription>
        This app is for prepping and studying for React interviews
      </SCDescription>
      <SCSectionWrapper>
        <section>
          <h2>Interview Page</h2>
          <SCNoteTitle> Features to keep track of </SCNoteTitle>
          <SCNotesWrapper>
            <li>useState/useEffect, useReducer, useRef</li>
            <li>createContext{'({})'}, {'<'}Name.Provider value={'{someValue}'}{'>'}</li>
            <li>dispatch{'({type, payload})'}, reducer(state, actions)</li>
            <li>Custom Hook</li>
            <li>Cleaning up {'(return () => { clearInterval(timerId)})'}</li>
            <li>memo(component) only works on primitive data values, useMemo, useCallback, Webworker</li>
            <li>useTransition</li>
            <li>Calling and handling API response</li>
            <li>document.add/RemoveEventListener{'("mousedown", (event: Event) => { const el = event.target; })'}</li>
          </SCNotesWrapper>
        </section>
      </SCSectionWrapper>
      <SCSectionWrapper>
        <section>
          <h2>Live Coding</h2>
          <SCNoteTitle> Quick Projects to Practice for live coding </SCNoteTitle>
          <SCNotesWrapper>
            <li>Todo App</li>
            <li>Load Multiple Images (wip)</li>
          </SCNotesWrapper>
          <SCNoteTitle> Keep in mind while live coding </SCNoteTitle>
          <SCNotesWrapper>
            <li>don't confuse custom handlers with actual dom events. ie onClick vs onHandleClick</li>
            <li>same with using ref must be on html element not react element</li>
            <li>file needs to end in jsx/tsx</li>
            <li>remember to import react</li>
          </SCNotesWrapper>
        </section>
      </SCSectionWrapper>
    </Page>
  );
};

export default Home;
