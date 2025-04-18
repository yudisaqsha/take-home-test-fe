# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```


You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

**##Read this**


Untuk menjalankan aplikasi, pastikan terlebih dahulu menambahkan address api (http://localhost:3000/api) pada VITE_API_URL dalam .env untuk front-end

**#1. Tampilan utama Aplikasi**

![Screenshot_1](https://github.com/user-attachments/assets/36bd929e-d194-4921-ae32-ce8d43f639a3)

**#2. Modal untuk Add Item**
![Screenshot_2](https://github.com/user-attachments/assets/37eddbf8-600a-4794-9d70-1cd2bdbc4dcc)

**#3. Validasi jika harga jual lebih kecil dari harga beli**
![Screenshot_4](https://github.com/user-attachments/assets/5dae5de7-7ed6-40c8-aa2f-23020e8d44ee)

**#4. Tampilan jika data berhasil ditambahkan**
![Screenshot_5](https://github.com/user-attachments/assets/b64b5ee4-c046-4516-bdc5-49bddaba601d)

**#5. Modal untuk update/edit Data (prefilled)**
![Screenshot_6](https://github.com/user-attachments/assets/52105e1a-17e7-47b3-818e-2438a6bebc21)

**#6. Data berhasil di edit**
![Screenshot_7](https://github.com/user-attachments/assets/b0808f21-60ff-451f-87a7-3daebff0304d)

**#7. Dialog Delete Data (confirm delete)**
![Screenshot_8](https://github.com/user-attachments/assets/2682cb92-67b2-4ec6-bb6e-f1fbadc5eac2)

**#8. Jika stock item lebih dari 0, maka data tidak bisa dihapus**
![Screenshot_9](https://github.com/user-attachments/assets/1b01f2f8-cff6-4638-b76c-b66d0811818e)

**#9. Jika stock item = 0, maka data dapat dihapus**
![Screenshot_10](https://github.com/user-attachments/assets/3a600f37-8f0a-4544-9b74-62c8242940c3)
![Screenshot_11](https://github.com/user-attachments/assets/b66d654e-ad70-48fc-aa84-b9815e6d78c0)




