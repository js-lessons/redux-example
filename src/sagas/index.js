import watchComments from './comments'

export default function *rootSaga() {
  yield [watchComments()]
}
