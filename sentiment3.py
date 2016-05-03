import json
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
from textblob import TextBlob
from elasticsearch import Elasticsearch
import logging

# import twitter keys and tokens
from config import *


# create instance of elasticsearch
es = Elasticsearch()

tracer = logging.getLogger('elasticsearch.trace')
tracer.setLevel(logging.INFO)
tracer.addHandler(logging.FileHandler('/tmp/es_trace.log'))

positiveSentiment = 0
negativeSentiment = 0
freqWordList = {}

def setPositiveSentiment(val):
    global positiveSentiment
    positiveSentiment += val

def setNegativeSentiment(val):
    global negativeSentiment
    negativeSentiment += val

def setNouns(nouns):
    global freqWordList
    for noun in nouns:
        if "https" not in noun:
            if "//" not in noun:
                if " " not in noun:
                    print "noun: " + noun
                    present = False
                    for key in freqWordList:
                        if noun == key:
                            freqWordList[key] += 1
                            present = True
                    if not present:
                        freqWordList[noun] = 1


def printNouns():
    global freqWordList
    """
    for key in freqWordList:
        print key + " appears " + str(freqWordList[key]) + " time(s)."
    """
    for w in sorted(freqWordList, key=freqWordList.get, reverse=True):
        print w, freqWordList[w]

class TweetStreamListener(StreamListener):
    
    # on success
    def on_data(self, data):

        # decode json
        dict_data = json.loads(data)

        # pass tweet into TextBlob
        tweet = TextBlob(dict_data["text"])

        #print tweet
        print tweet
        setNouns(tweet.noun_phrases)

        # output sentiment polarity
        print tweet.sentiment.polarity

        # determine if sentiment is positive, negative, or neutral
        if tweet.sentiment.polarity < 0:
            sentiment = "negative"
            setNegativeSentiment(tweet.sentiment.polarity)
            #print negativeSentiment
        elif tweet.sentiment.polarity == 0:
            sentiment = "neutral"
        else:
            sentiment = "positive"
            setPositiveSentiment(tweet.sentiment.polarity)
            #print positiveSentiment

        # output sentiment
        print sentiment

        value = str('{'+'Tweet :'+str(tweet)+'\n'+'Sentiment score: '+str(tweet.sentiment.polarity)+'\n'+'Sentiment: '+str(sentiment)+'\n'+'}'+'\n')
        f.write(value)

    # on failure
    def on_error(self, status):
        if status_code == 420:
            #returning False in on_data disconnects the stream
            return False
        print status

if __name__ == '__main__':


    # create instance of the tweepy tweet stream listener
    listener = TweetStreamListener()
    # set twitter keys/tokens
    auth = OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_key, access_secret)

    # create instance of the tweepy stream
    stream = Stream(auth, listener)

    keyword = raw_input("Input keyword: ")
    # search twitter for keyword
    f = open('output', 'w')
    try:
        stream.filter(track=[keyword],languages=['en'])
    except KeyboardInterrupt:
        print "\nKeyboardInterrupt caught"
        #exit StreamListener()
        print "Positive Sentiment  = " + str(positiveSentiment)
        print "Negative Sentiment = " + str(negativeSentiment)
        printNouns()
