import scrapy

class JobsSpider(scrapy.Spider):
    name = "jobs24"
    download_delay = 1
    user_agent = 'University of Amsterdam - Information Retrieval Project  (persenal_email@gmail.com)'
    httpcache_enabled = True
    start_urls = [
        'https://www.jobs24.co.uk/search-results.aspx?query=djAuMXxSVjpRdWlja2xpc3Rpbmd8U086UmVsZXZhbnN8UE46MXxQUzo1MHx2MC4x&params=Z2Vvc2VhcmNoOjF8c2VhcmNoc3RhcnRkYXRlOjF8cXVlcnlmaWx0ZXI6fHdvcmthcmVhOjB8d29ya2FyZWFfbW9yZTowfEpvYmxvY2F0aW9uMzowfEpvYmxvY2F0aW9uM19tb3JlOjB8Sm9ibG9jYXRpb240OjB8Sm9ibG9jYXRpb240X21vcmU6MHxKb2Jsb2NhdGlvbjU6MHxKb2Jsb2NhdGlvbjVfbW9yZTowfEpvYmxvY2F0aW9uNjowfEpvYmxvY2F0aW9uNl9tb3JlOjB8Sm9idHlwZTowfEpvYnR5cGVfbW9yZTowfHdhZ2Vmcm9tOjB8d2FnZWZyb21fbW9yZTowfHdhZ2V0eXBlOjB8d2FnZXR5cGVfbW9yZTow',
    ]

    def parse(self, response):
        # follow links to author pages
        for href in response.css("div.HeadingContainer ::attr(href)").getall():
            yield response.follow(href, self.parse_vacancie)

        # follow pagination links
        next_page = response.css("div.PnSearchResultNavigation ::attr(href)").getall()[-1]

        if next_page is not None:
            yield response.follow(next_page, callback=self.parse)

    def parse_vacancie(self, response):
        list_disc = response.css('div.JobAd ::text').getall() 
        title_obj = response.css('h1[itemprop="title"] ::text').extract_first()
        company = response.css('div[itemprop="hiringOrganization"] ::text').getall()
        location = response.css('h2[itemprop="addressLocality addressRegion"] ::text').extract_first()
        salary = response.css('span[itemprop="baseSalary"] ::text').extract_first()
        date_listed = response.css('div.Value ::text').extract_first()
        yield {
            'title': title_obj,
            'company': company,
            'description': list_disc,
            'location': location,
            'salary': salary,
            'date_listed': date_listed,
            'URL': response.request.url,
        }