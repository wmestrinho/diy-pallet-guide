// DIY Pallet Course — quiz data.
// Same shape as quizzes.js: { quiz_id, title, track, module, questions:[{id,question,options,correct,explanation}] }
// Authored for the Absolutely Plausible pallet field guide. CC BY-NC 4.0.

export const PALLET_QUIZZES = {
  pallet_sourcing: {
    quiz_id: 'pallet_sourcing',
    title: 'Sourcing Check',
    track: 'DIY Pallet Build',
    module: 'M1',
    questions: [
      { id: 'q1', question: 'You spot a stack of pallets behind a garden center that look abandoned. What is the right move?',
        options: { A: 'Load them up — abandoned pallets are fair game.', B: 'Ask the manager for permission before taking any.', C: 'Take a few and leave the rest so nobody notices.' },
        correct: 'B', explanation: 'Always ask, and ask the manager specifically — front-line staff often can\'t say yes. Taking pallets off a property without permission is theft, even when they look discarded.' },
      { id: 'q2', question: 'Reclaimed pallet wood has more unusable sections than new lumber. How much extra should you collect over your target?',
        options: { A: 'No extra — measure exactly what the plan needs.', B: 'About 5%.', C: 'Roughly 30–40% extra to cover cracks, splits, and rot.' },
        correct: 'C', explanation: 'Budget 30–40% over your target. Reclaimed boards split, warp, and rot far more than fresh lumber, so a healthy margin keeps a project from stalling mid-build.' },
      { id: 'q3', question: 'Which of these is the best pallet to bring home?',
        options: { A: 'A cracked, rain-soaked pallet — it\'s free, so why not.', B: 'A plain, dry, unmarked pallet in solid condition.', C: 'A bright blue pallet in perfect shape.' },
        correct: 'B', explanation: 'Take only the good ones. Skip cracked or soaked wood, and skip colored (blue/red/brown) pallets — those belong to rental pools and aren\'t free to take.' },
    ],
  },

  pallet_safety: {
    quiz_id: 'pallet_safety',
    title: 'Safety Decision Check',
    track: 'DIY Pallet Build',
    module: 'M2',
    questions: [
      { id: 'q1', question: 'A pallet\'s IPPC stamp shows the code "MB". What should you do?',
        options: { A: 'Use it — MB just means it was measured and boxed.', B: 'Never use it — MB is Methyl Bromide, a toxic pesticide fumigation.', C: 'Sand it down first, then it\'s safe to use.' },
        correct: 'B', explanation: 'MB = Methyl Bromide, fumigated with a toxic pesticide. This is the one rule that matters most: never use an MB pallet, no matter how good the wood looks.' },
      { id: 'q2', question: 'Which treatment code tells you a pallet is safe to build with?',
        options: { A: 'HT — Heat Treated (heated to kill pests, no chemicals).', B: 'MB — Methyl Bromide.', C: 'Any pallet with no stamp at all is guaranteed safe.' },
        correct: 'A', explanation: 'HT (Heat Treated) and KD (Kiln Dried) are safe — no chemicals, just heat. An unstamped pallet is probably domestic untreated wood: likely fine, but inspect it closely.' },
      { id: 'q3', question: 'What do blue (CHEP), red (PECO), and brown (IPP) pallets have in common?',
        options: { A: 'They are premium heat-treated pallets, ideal for furniture.', B: 'They are rental property owned by pool companies — taking them is theft.', C: 'They are all treated with Methyl Bromide.' },
        correct: 'B', explanation: 'Colored pallets belong to rental pool companies and are not free. Use plain, unmarked "whitewood" pallets that are genuinely discarded.' },
      { id: 'q4', question: 'A pallet smells strongly of chemicals and has oily stains. It\'s stamped HT. Use it?',
        options: { A: 'Yes — the HT stamp overrides any contamination.', B: 'No — skip any pallet with spills, stains, or chemical odors regardless of stamp.', C: 'Yes, once you wipe the stains off.' },
        correct: 'B', explanation: 'A safe treatment stamp doesn\'t undo contamination. You usually can\'t tell what a pallet carried, so trust your nose and eyes — reject spills, oily stains, and chemical smells.' },
    ],
  },

  pallet_tools: {
    quiz_id: 'pallet_tools',
    title: 'Tools & Gear Check',
    track: 'DIY Pallet Build',
    module: 'M3',
    questions: [
      { id: 'q1', question: 'What is the fastest, cleanest way to break a pallet down into usable boards?',
        options: { A: 'Lever every board off with a pry bar and brute force.', B: 'A reciprocating saw with a metal-cutting blade, run between boards and stringers to cut the nails.', C: 'Smash the joints apart with a sledgehammer.' },
        correct: 'B', explanation: 'Cut the nails, don\'t fight them. A recip saw with a metal blade slices the fasteners and saves the boards. Prying works but splits wood and tests your patience.' },
      { id: 'q2', question: 'Which sandpaper progression is right for smoothing rough reclaimed wood?',
        options: { A: 'Start fine (220), then go coarser (60) for a rustic look.', B: 'Only ever use 220 grit.', C: 'Start coarse (60–80) to knock down the roughness, then step up (120, then 220).' },
        correct: 'C', explanation: 'Sand in stages: coarse first (60–80) for the roughest surface, then finer (120, then 220) for anything that will be seen or touched.' },
      { id: 'q3', question: 'Which piece of safety gear is most important specifically when sanding old pallet wood?',
        options: { A: 'A dust mask — reclaimed wood carries mold spores, dirt, and droppings.', B: 'Ear protection.', C: 'None needed once the nails are out.' },
        correct: 'A', explanation: 'Always wear a dust mask when sanding or cutting reclaimed wood. Gloves, eye and ear protection all matter too — safety gear is not optional.' },
    ],
  },

  pallet_prep: {
    quiz_id: 'pallet_prep',
    title: 'Wood Prep Check',
    track: 'DIY Pallet Build',
    module: 'M4',
    questions: [
      { id: 'q1', question: 'Why is removing every last nail and staple the critical first prep step?',
        options: { A: 'It makes the wood lighter to carry.', B: 'A single missed fastener will ruin a saw blade or a sander pad.', C: 'Nails change the color of the finish.' },
        correct: 'B', explanation: 'One missed nail wrecks a blade or sander pad instantly. Pull or punch out every fastener before any cutting or sanding.' },
      { id: 'q2', question: 'You have a pile of prepped boards of all different thicknesses. What should you do before designing?',
        options: { A: 'Force them into a standard new-lumber cut list.', B: 'Sort into piles — good faces, structural pieces, scrap — and design around what you actually have.', C: 'Throw out anything that isn\'t perfectly uniform.' },
        correct: 'B', explanation: 'Pallet wood isn\'t uniform. Sort by thickness, width, and quality, then design around your real inventory rather than an ideal cut list.' },
      { id: 'q3', question: 'A batch of pallet boards feels damp. When can you build with them?',
        options: { A: 'Right away — damp wood is easier to cut.', B: 'After letting them dry fully; building with damp wood invites warping later.', C: 'Never — damp boards are always scrap.' },
        correct: 'B', explanation: 'Clean off dirt, wipe down, and let damp wood dry completely before building. Damp boards move and warp as they dry.' },
    ],
  },

  pallet_process: {
    quiz_id: 'pallet_process',
    title: 'The 9-Step Process Check',
    track: 'DIY Pallet Build',
    module: 'M5',
    questions: [
      { id: 'q1', question: 'For furniture, why are screws generally better than nails for assembly?',
        options: { A: 'Screws are cheaper than nails.', B: 'Screws hold better and come apart if you make a mistake.', C: 'Nails are illegal for reclaimed wood.' },
        correct: 'B', explanation: 'Screws hold better than nails for furniture and let you take a joint apart if you err. Pre-drill pilot holes first — dry reclaimed wood splits easily.' },
      { id: 'q2', question: 'When cutting boards to length and you\'re not certain of the measurement, you should…',
        options: { A: 'Cut short — you can always add a spacer.', B: 'Cut a little long — you can always trim, never un-trim.', C: 'Cut exactly and hope it fits.' },
        correct: 'B', explanation: 'Measure twice, and when unsure cut a little long. You can always trim a piece down; you can never add wood back.' },
      { id: 'q3', question: 'You built an outdoor bench from pallet wood. What finish does it need?',
        options: { A: 'Nothing — pallet wood is naturally weatherproof.', B: 'Exterior sealant or spar urethane — softwood weathers fast unprotected.', C: 'A coat of food-safe mineral oil only.' },
        correct: 'B', explanation: 'Pallet wood is softwood and weathers fast outdoors. Seal it for its environment: exterior sealant or spar urethane outside, clear poly/wax/oil inside, food-safe finish for food contact.' },
      { id: 'q4', question: 'According to the process, when is a build truly "done"?',
        options: { A: 'As soon as the last screw is driven.', B: 'When it\'s installed where it belongs and photographed done and in use.', C: 'After the first sanding pass.' },
        correct: 'B', explanation: 'Step 9 is Install: place the piece, then photograph it done and in use. A build isn\'t documented until it\'s shown working.' },
    ],
  },
};

export const PALLET_QUIZ_ORDER = ['pallet_sourcing', 'pallet_safety', 'pallet_tools', 'pallet_prep', 'pallet_process'];
