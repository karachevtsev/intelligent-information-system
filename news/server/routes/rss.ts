import { Feed } from 'feed';
import { defineEventHandler } from 'h3';

const { public: { apiBase } } = useRuntimeConfig();

export default defineEventHandler(async (context) => {
    const url = new URL(context.req.url!, 'https://news.dtkt.ua');
    console.log(url);
    const { data } = await $fetch<{ data: any[] }>('/news/content', {
        method: 'GET',
        baseURL: apiBase,
        params: Object.fromEntries(url.searchParams.entries()),
    });

    const feed = new Feed({
        title: '«Дебет-Кредит» - бухгалтерські новини',
        description: 'DTKT RSS channels',
        id: 'https://news.dtkt.ua/',
        link: 'https://news.dtkt.ua/rss',
        language: 'uk',
        // image: 'http://example.com/image.png',
        favicon: 'https://news.dtkt.ua/favicon/android-chrome-512x512.png',
        copyright: `© 2012-${new Date().getFullYear()} «Дебет-Кредит» Український фінансово-бухгалтерський портал.`,
        updated: new Date(data[0].publishedAt),
        //TODO generator: 'awesome', // optional, default = 'Feed for Node.js'
    });


    data.forEach((post) => {
        feed.addItem({
            title: post.title,
            id: post.url,
            link: post.url,
            description: post.description,
            // content: post.content,
            author: [{
                name: post.author?.name ?? '-',
            }],
            date: new Date(post.publishedAt),
            // image: post.image,
        });
    });

    context.res.setHeader('Content-Type', 'application/atom+xml');

    return feed.atom1();
});
