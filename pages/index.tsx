/* eslint-disable react/prop-types */
import React from 'react';
import Head from 'next/head';
import Layout, { siteTitle } from '@/components/layout';
import utilStyles from '@/styles/utils.module.css';
import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';
import Date from '@/components/date';
import { GetStaticProps } from 'next';

type Posts = {
    readonly date: string;
    readonly title: string;
    readonly id: string;
};

export const getStaticProps: GetStaticProps = async () => {
    const allPostsData: Posts[] = getSortedPostsData();
    return {
        props: {
            allPostsData,
        },
    };
};

const Home: React.FC<GetStaticProps> = (props) => {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <p>[Your Self Introduction]</p>
                <p>
                    (This is a sample website - you’ll be building a site like this in{' '}
                    <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
                </p>
                <Link href="/todos" as={`/todos`}>
                    <a>Go To Todos</a>
                </Link>
            </section>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <ul className={utilStyles.list}>
                    {props['allPostsData'].map(({ id, date, title }) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href="/posts/[id]" as={`/posts/${id}`}>
                                <a>{title}</a>
                            </Link>
                            <br />
                            <small className={utilStyles.lightText}>
                                <Date dateString={date} />
                            </small>
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    );
};

export default Home;
