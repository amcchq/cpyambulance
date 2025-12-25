import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import blogPosts from '../data/blogData';

const Blog = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        document.title = 'Health Blog | CPY Ambulance - Emergency Tips & First Aid';
    }, []);

    const categories = ['All', 'Emergency Tips', 'First Aid', 'Health Awareness'];

    const filteredPosts = selectedCategory === 'All'
        ? blogPosts
        : blogPosts.filter(post => post.category === selectedCategory);

    const featuredPost = blogPosts[0];

    const getCategoryStyles = (category) => {
        switch (category) {
            case 'Emergency Tips':
                return 'bg-red-100 text-red-700 border-red-200';
            case 'First Aid':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'Health Awareness':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            {/* Hero Section */}
            <section className="relative py-16 md:py-24 bg-gradient-to-br from-navy-900 via-navy-800 to-primary-900 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-500 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
                            📚 Knowledge Hub
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Health & Emergency
                            <span className="block text-primary-400">Tips Blog</span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                            Expert advice on emergency preparedness, first aid, and healthcare awareness.
                            Stay informed, stay prepared.
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10 mb-16">
                <Link to={`/blog/${featuredPost.slug}`} className="block group">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-slate-100">
                        <div className="md:flex">
                            <div className="md:w-1/2">
                                <div className="h-64 md:h-full overflow-hidden">
                                    <img
                                        src={featuredPost.image}
                                        alt={featuredPost.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            </div>
                            <div className="md:w-1/2 p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold uppercase tracking-wide">
                                        Featured
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryStyles(featuredPost.category)}`}>
                                        {featuredPost.category}
                                    </span>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4 group-hover:text-primary-600 transition-colors">
                                    {featuredPost.title}
                                </h2>
                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    {featuredPost.excerpt}
                                </p>
                                <div className="flex items-center justify-between text-sm text-slate-500">
                                    <div className="flex items-center gap-4">
                                        <span>{featuredPost.author}</span>
                                        <span>•</span>
                                        <span>{featuredPost.readTime}</span>
                                    </div>
                                    <span className="text-primary-600 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                                        Read More
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </section>

            {/* Category Filter */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="flex flex-wrap justify-center gap-3">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${selectedCategory === category
                                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
                                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </section>

            {/* Blog Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.slice(1).map((post) => (
                        <Link
                            key={post.id}
                            to={`/blog/${post.slug}`}
                            className="group"
                        >
                            <article className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 h-full flex flex-col">
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <span className={`self-start px-3 py-1 rounded-full text-xs font-semibold mb-3 ${getCategoryStyles(post.category)}`}>
                                        {post.category}
                                    </span>
                                    <h3 className="text-lg font-bold text-navy-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm mb-4 flex-1 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-100">
                                        <span>{post.readTime}</span>
                                        <span className="text-primary-600 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                                            Read
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-primary-600 to-primary-700 py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Need Emergency Assistance?
                    </h2>
                    <p className="text-white/90 text-lg mb-8">
                        Our ambulances are available 24/7. Don't hesitate to call in emergencies.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="tel:+919942000266"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-xl font-bold hover:bg-slate-100 transition-all shadow-xl"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                            </svg>
                            Call: +91-9942000266
                        </a>
                        <Link
                            to="/book"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur text-white border-2 border-white/30 rounded-xl font-bold hover:bg-white/20 transition-all"
                        >
                            Book Ambulance Online
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blog;
