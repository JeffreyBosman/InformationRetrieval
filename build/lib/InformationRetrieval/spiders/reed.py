
import scrapy
class JobsSpider(scrapy.Spider):
    name = "reed"
    download_delay = 1
    user_agent = 'University of Amsterdam - Information Retrieval Project  (persenal_email@gmail.com)' 
    httpcache_enabled = False 
    start_urls = [
        'https://www.reed.co.uk/jobs',
		]

    def parse(self, response):
        # follow links to author pages
        for href in response.css("article.job-result a::attr(href)").getall():
            yield response.follow(href, self.parse_vacancie)

        # follow pagination links
        next_page = response.css("[id=nextPage]::attr(href)").get()
#        next_page = response.css("#nextPage ::attr(href)")
        if next_page is not None:
            yield response.follow(next_page, callback=self.parse)

			
			
    def parse_vacancie(self, response):
        list_disc = response.css("div.description *::text").getall()
        title_obj = response.css('div.col-xs-12 h1::text').get()
        company = response.css("div.posted span::text").get()
        location =response.css("div.location.col-xs-12.col-sm-6.col-md-6.col-lg-6 ::text").getall()
        salary = response.css('span[itemprop="baseSalary"] ::text').getall()
        date_listed = response.css('div.posted ::text').getall()

        yield {
            'title': title_obj,
            'company': company,
            'description': list_disc,
            'location': location,
            'salary': salary,
            'date_listed': date_listed,
            'URL': response.request.url,
        }


