This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Functional Description

The graph shows the average temperature of the previous week for the selected city.
When choosing another city - the chart is recalculated.
![enter image description here](https://i.imgur.com/w87t5Vo.gif)

When loading, the table shows information on the given cities.

In the search field, you can search by city, you can select multiple cities.
When you clear the search field, a standard list of cities is shown.
![enter image description here](https://i.imgur.com/807hBZL.gif)

In the fields of minimum and maximum temperatures, the corresponding values are pulled up, counted throughout the table.
By changing the values of the minimum and maximum temperatures, the values in the table are filtered.
![enter image description here](https://i.imgur.com/q82TkAr.gif)
