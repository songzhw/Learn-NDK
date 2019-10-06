import { AnyAction } from "redux";
import { ACTION_CONTINUE_SYNC } from "./ChannelAsync_Saga";

let listener: any = null;

const subscribe = (l: (action: AnyAction) => void) => {
  listener = l;
};
const unsubscribe = () => {
  listener = null;
};

const fetchApi = (id: string) => {
};

function* sync(id: string) {
  const resp = yield fetch(`http://www.mocky.io/v2/${id}`);
  const str = yield resp.json();
  console.log(`==================== szw: ${str.data.id}`);
  for (let i = 0; i < 10; i++) {
    if (listener) {
      listener({ type: ACTION_CONTINUE_SYNC, payload: { id: i, data: str } });
    }
  }
}

export default { subscribe, unsubscribe, sync, fetchApi };