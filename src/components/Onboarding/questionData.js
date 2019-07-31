export default [
  {
    text: 'Do you mix up letters that are similar in shape?',
    id: 'mix_up_letters',
    type: 'YesNo'
  },
  {
    if: 'mix_up_letters',
    text: 'If you know the letters you mix up, please type them here.',
    id: 'mix_up_letters_combinations',
    type: 'LettersCombinations'
  },
  {
    text: 'Do you see some letters as upside down?',
    id: 'upsidedown_letters',
    type: 'YesNo'
  },
  {
    if: 'upsidedown_letters',
    text: 'If you know the letters you see upside down, please type them here.',
    id: 'upsidedown_letters_characters',
    type: 'Letters'
  },
  {
    text: 'Do you see text jump around the page?',
    id: 'text_jump',
    type: 'YesNo'
  },
  {
    text: 'Do you see the letters bunched together?',
    id: 'text_bunched',
    type: 'YesNo'
  },
  {
    text: 'Do your eyes skip lines when you read?',
    id: 'lines_skip',
    type: 'YesNo'
  },
  {
    text: 'Do you often find the text size too small?',
    id: 'text_small',
    type: 'YesNo'
  },
  {
    text: 'Which font do you prefer?',
    id: 'font_prefer',
    type: 'FontTest'
  },
  {
    text: 'Which color do you prefer?',
    id: 'color_prefer',
    type: 'ColorTest'
  }
]
