const hateos = {
    getArticlesHateos: (scheme, hostname) => ({
        'self_url': `${scheme}${hostname}/articles`,
        'article_url':  `${scheme}${hostname}/articles/{article_id}`,
    })
}

module.exports = hateos