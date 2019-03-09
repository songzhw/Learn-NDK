const sagas = function* () {
  yield takeEvery(CHANNEL_DEMO, onGotAction);
};

const onGotAction = function* (action) {
  try {
    console.log(`szw saga got action : ${JSON.stringify(action)}`);
  } catch (error) {
    console.log(`szw chanel demo saga error = ${JSON.stringify(error)}`);
  }
};

export default sagas