<template>
  <section id="main">
    <div class="container">
      <img
        src="../../assets/logo.png"
        class="mt-12 w-36 rounded-full border-1 border-slate-700 block mx-auto"
        alt=""
      />
      <div
        class="rounded-md border border-t-purple-700 border-t-2 mt-12 p-4 w-96 mx-auto"
      >
        <div class="py-4">
          <h1 class="text-xl font-semibold text-slate-600 text-left">
            Register
          </h1>
          <form class="mt-8" action="/register" method="POST">
            <div class="relative">
              <input
                id="fullname"
                name="fullname"
                type="text"
                class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-purple-600"
                placeholder="john@doe.com"
              />
              <label
                for="fullname"
                class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >Fullname</label
              >
            </div>
            <div class="mt-8 relative">
              <input
                id="username"
                name="username"
                type="text"
                class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-purple-600"
                placeholder="john@doe.com"
              />
              <label
                for="username"
                class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >Username</label
              >
            </div>
            <div class="mt-8 relative">
              <input
                id="password"
                type="password"
                name="password"
                class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-purple-600"
                placeholder="Password"
              />
              <label
                for="password"
                class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >Password</label
              >
            </div>
            <div class="mt-8 relative">
              <input
                id="repeatPassword"
                type="password"
                name="repeatPassword"
                class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-purple-600"
                placeholder="repeatPassword"
              />
              <label
                for="repeatPassword"
                class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >Repeat Password</label
              >
            </div>
            <button
              type="submit"
              class="mt-8 px-4 py-2 rounded bg-purple-500 hover:bg-purple-400 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-purple-500 focus:ring-opacity-80 cursor-pointer"
            >
              Daftar
            </button>
          </form>
          <p class="mt-4 block text-slate-500 text-xs text-center">
            Already have an account?
            <a
              href="/login"
              class="text-purple-600 hover:underline focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Masuk
            </a>
          </p>
        </div>
      </div>

      <footer class="my-8 text-xs">
        Copyright&copy; 2024 &dash;
        <a
          class="text-purple-600 hover:underline focus:outline-none focus:ring-2 focus:ring-purple-500"
          href="http://github.com/khaylila"
          >Khaylila</a
        >
      </footer>
    </div>
  </section>
</template>

<script>
export default {
  name: "RegisterView",
};
</script>

<style></style>
