import { Component } from "@nestjs/common";
import * as natural from "natural";
import { BayesClassifier } from "natural";
import { STEMS } from "./stems.constant";
import * as _ from "lodash";

@Component()
export class NlpService {

  private readonly classifier: BayesClassifier;

  constructor() {
    this.classifier = new natural.BayesClassifier();
    this.train();
  }

  public train() {
    this.addDocuments(STEMS.LAST_LETTER_STEM.stem, STEMS.LAST_LETTER_STEM.text);
    this.addDocuments(STEMS.FIRST_LETTER_STEM.stem, STEMS.FIRST_LETTER_STEM.text);
    this.addDocuments(STEMS.HINT_STEM.stem, STEMS.HINT_STEM.text);

    this.classifier.train();
  }

  public addDocuments(stem: string, text: string[]) {
    text.forEach(item => this.classifier.addDocument(item, stem));
  }

  public classify(message: string): any | null {

    const anyMatch = _.chain(STEMS)
      .keys()
      .map(item => STEMS[item].text)
      .flatten()
      .filter(item => {
        return (natural.LevenshteinDistance(item, message.toLowerCase(), {search: true}) as any).distance <= 5;
      })
      .value();

    if (anyMatch && anyMatch.length) {
      return this.classifier.classify(message.toLowerCase());
    } else {
      return null
    }
  }

}
