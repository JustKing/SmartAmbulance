export default function ({ route, store, redirect }) {
  if (store.getters["modules/user/isAuth"]) {
    if (route.path == "/") {
      redirect("/map");
    }
  } else {
    redirect("/");
  }
}
