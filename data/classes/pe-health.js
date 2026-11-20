// PE / Health: everything from the PE Midterm study site (ibbucoder/PE_Midterm), plus the
// rest of the final exam study guide: the study guide's exercise for each muscle, and
// Unit 06 Flexibility and Unit 07 Nutrition.
// Units 01–05 keep the PE Midterm wording and layouts. Their sections use "html" so the
// original tables, charts and diagrams come over unchanged. The interactive parts (muscle
// map, heart rate gauge, 1RM calculator, activity sorter, method matcher, fat cell
// timeline) are built by pe-health-tools.js.
// muscles, machines, activities, methods and plainMuscles are used only by those tools.
FINALS.addClass('pe-health', Object.assign({
  "units": [
    {
      "id": "u1",
      "num": "01",
      "title": "Intro to Personal Fitness",
      "short": "Intro",
      "sections": [
        {
          "id": "u1-wellness",
          "title": "Wellness",
          "html": "<p class=\"lead\">4 domains of wellness</p>\n<ul class=\"quad\"><li>Physical</li><li>Emotional</li><li>Intellectual</li><li>Social</li></ul>\n<p>Physical activity enhances the intellectual, emotional AND social aspects of health.</p>",
          "simple": "Being well has 4 parts: your body, your feelings, your mind and your friends. When you move your body, the other 3 get better too."
        },
        {
          "id": "u1-components",
          "title": "Fitness components",
          "html": "<p class=\"lead\">5 health-related fitness components, with the test used for each</p>\n<table class=\"tbl stack\">\n<thead><tr><th scope=\"col\">Component</th><th scope=\"col\">Definition</th><th scope=\"col\">Test</th></tr></thead>\n<tbody>\n<tr><th scope=\"row\">Muscular Strength</th><td data-label=\"Definition\">Maximum force a muscle group can exert against resistance</td><td data-label=\"Test\">Push-up test</td></tr>\n<tr><th scope=\"row\">Muscular Endurance</th><td data-label=\"Definition\">The ability of a muscle to repeatedly exert force over a prolonged period of time</td><td data-label=\"Test\">Curl-up test</td></tr>\n<tr><th scope=\"row\">Cardiovascular Endurance</th><td data-label=\"Definition\">The ability of your heart and lungs to supply oxygen to your body during sustained physical activity</td><td data-label=\"Test\">PACER test</td></tr>\n<tr><th scope=\"row\">Flexibility</th><td data-label=\"Definition\">The ability to move a joint through normal range of motion (ROM)</td><td data-label=\"Test\">Sit &amp; reach test</td></tr>\n<tr><th scope=\"row\">Body Composition</th><td data-label=\"Definition\">The relative comparison of body fat to lean body mass (muscle, bone, organs)</td><td data-label=\"Test\">—</td></tr>\n</tbody>\n</table>",
          "simple": "Fitness has 5 parts. Strength: how hard your muscles can push. Muscle endurance: how long your muscles can keep going. Cardio endurance: how long your heart and lungs can keep going. Flexibility: how well your joints move. Body composition: how much of you is fat and how much is not."
        },
        {
          "id": "u1-benefits",
          "title": "Benefits",
          "html": "<p class=\"lead\">Benefits of physical fitness</p>\n<ul class=\"cols\">\n<li>Improved health</li><li>Stronger heart</li><li>Improves mood</li><li>Increased energy levels</li>\n<li>Lowers risk of noncommunicable diseases</li><li>Sleep better</li><li>Avoid injuries</li><li>Better self-control</li>\n<li>Happier with how you see yourself</li><li>Increased life expectancy</li><li>Better physical performance</li>\n</ul>",
          "simple": "Being fit helps you feel better, have more energy, sleep better and live longer."
        },
        {
          "id": "u1-rpe",
          "title": "RPE",
          "html": "<p class=\"lead\">Rate of Perceived Exertion</p>\n<div class=\"rpe\">\n<div><h3>Moderate activity</h3><p>Breathing heavily, can hold a short conversation. Still somewhat comfortable, but becoming noticeably more challenging.</p></div>\n<div class=\"hard\"><h3>Vigorous activity</h3><p>Borderline uncomfortable. Short of breath, can speak a sentence.</p></div>\n</div>",
          "simple": "RPE means how hard exercise feels to you. Moderate: you can still talk a little. Vigorous: you can only say one sentence."
        },
        {
          "id": "u1-lifetime",
          "title": "Lifetime activities",
          "html": "<p>Activities you can do during any phase of your lifetime:</p>\n<p class=\"runon\">Group fitness / Swimming / Walk/jog / Tennis / Biking / Golf</p>",
          "simple": "These are activities you can do at any age, even when you are old."
        },
        {
          "id": "u1-smart",
          "title": "SMART goals",
          "html": "<ol class=\"smart\">\n<li><b>S</b>Specific (&amp; written)</li>\n<li><b>M</b>Measurable</li>\n<li><b>A</b>Attainable (yet challenging)</li>\n<li><b>R</b>Realistic</li>\n<li><b>T</b>Time frame</li>\n</ol>\n<table class=\"tbl plain\">\n<tbody>\n<tr><th scope=\"row\">Strength example</th><td>“I will increase my maximum bench press to 150 pounds by December 31.”</td></tr>\n<tr><th scope=\"row\">Cardio example</th><td>“I will be able to run nonstop for 30 minutes by June 1.”</td></tr>\n</tbody>\n</table>",
          "simple": "A SMART goal is a good goal. It says exactly what you will do, you can measure it, it is hard but possible, it is realistic, and it has a due date."
        }
      ]
    },
    {
      "id": "u2",
      "num": "02",
      "title": "Cardiovascular Fitness",
      "short": "Cardio",
      "sections": [
        {
          "id": "u2-basics",
          "title": "Basics",
          "html": "<table class=\"tbl plain\">\n<tbody>\n<tr><th scope=\"row\">The #1 killer worldwide</th><td>Cardiovascular disease</td></tr>\n<tr><th scope=\"row\">Cardiovascular endurance</th><td>The ability to persist in physical activities that rely on the heart, blood vessels and lungs to supply oxygen to the working muscles</td></tr>\n<tr><th scope=\"row\">Function of the heart</th><td>To pump oxygenated blood to various parts of the body</td></tr>\n<tr><th scope=\"row\">Most drastically affects</th><td>Cardiovascular fitness can most drastically affect life expectancy</td></tr>\n</tbody>\n</table>",
          "simple": "Cardiovascular means your heart and blood vessels. Heart and blood vessel disease kills the most people in the world. Your heart pumps blood with oxygen to your whole body. Being cardio fit can change how long you live."
        },
        {
          "id": "u2-risk",
          "title": "Risk factors",
          "html": "<p><strong>Risk factor:</strong> a major factor in your life that would increase your risk for a premature death.</p>\n<table class=\"tbl split\">\n<thead><tr><th scope=\"col\">Controllable</th><th scope=\"col\">Non-controllable</th></tr></thead>\n<tbody><tr>\n<td><ul class=\"bare\"><li>Inactivity</li><li>Smoking</li><li>Stress</li><li>High blood pressure</li><li>Cholesterol</li><li>Obesity</li></ul></td>\n<td><ul class=\"bare\"><li>Biological sex</li><li>Heredity</li><li>Age</li></ul></td>\n</tr></tbody>\n</table>",
          "simple": "A risk factor is something that makes you more likely to die young. You can change some of them, like smoking. You can’t change others, like your age."
        },
        {
          "id": "u2-benefits",
          "title": "Benefits",
          "html": "<p class=\"lead\">Benefits of cardiovascular fitness</p>\n<table class=\"tbl eq\">\n<tbody>\n<tr><td>Stronger heart</td><td class=\"eq-s\">=</td><td>Lower blood pressure</td></tr>\n<tr><td>Decreased body fat</td><td class=\"eq-s\">=</td><td>Less obesity</td></tr>\n<tr><td>Improved circulation</td><td class=\"eq-s\">=</td><td>Lower blood pressure</td></tr>\n<tr><td>Faster recovery time</td><td class=\"eq-s\">=</td><td>Improved performance</td></tr>\n<tr><td>Pumps more blood per beat</td><td class=\"eq-s\">=</td><td>Less stress on system</td></tr>\n<tr><td>Less risk of CV disease</td><td class=\"eq-s\">=</td><td>Decreased cholesterol</td></tr>\n</tbody>\n</table>",
          "simple": "Read each row like this: the left side causes the right side. A stronger heart causes lower blood pressure."
        },
        {
          "id": "u2-aerobic",
          "title": "Aerobic vs. anaerobic",
          "html": "<table class=\"tbl stack\">\n<thead><tr><th scope=\"col\"></th><th scope=\"col\">Aerobic</th><th scope=\"col\">Anaerobic</th></tr></thead>\n<tbody>\n<tr><th scope=\"row\">Meaning</th><td data-label=\"Aerobic\">“With oxygen”</td><td data-label=\"Anaerobic\">“Without oxygen”</td></tr>\n<tr><th scope=\"row\">Energy</th><td data-label=\"Aerobic\">Oxygen is the energy supply that helps muscles burn fuel and move, so it doesn’t need another energy source.</td><td data-label=\"Anaerobic\">Demand is greater than the supply, so it uses energy stored in the muscles (glucose).</td></tr>\n<tr><th scope=\"row\">Exercise</th><td data-label=\"Aerobic\">Moderate exercise over an extended period of time</td><td data-label=\"Anaerobic\">Short bursts of intense exercise</td></tr>\n<tr><th scope=\"row\">Examples</th><td data-label=\"Aerobic\">Biking, swimming, rollerblading, cross-country running</td><td data-label=\"Anaerobic\">Sprinting, agility ladders, tennis, wrestling</td></tr>\n</tbody>\n</table>\n<p class=\"spaced\"><strong>4 characteristics of cardiovascular activities:</strong> large muscle groups, continuous, rhythmic, aerobic.</p>",
          "simple": "Aerobic means with oxygen. It is steady exercise that lasts a long time, like biking. Anaerobic means without oxygen. It is a short, super hard burst, like sprinting. Your muscles use energy they already stored."
        },
        {
          "id": "u2-sorter",
          "title": "Sort it: aerobic or anaerobic",
          "tool": true,
          "html": "<p class=\"hint\">Drag each activity into a box, or tap it and then tap the box.</p>\n<div id=\"sorter\"></div>"
        },
        {
          "id": "u2-hr",
          "title": "Heart rate calculator",
          "tool": true,
          "html": "<div class=\"calc-grid\">\n<div>\n<label class=\"field\" for=\"age\">Your age</label>\n<input class=\"num-input\" id=\"age\" inputmode=\"numeric\" max=\"100\" min=\"1\" type=\"number\" value=\"14\"/>\n<p aria-live=\"polite\" class=\"math\" id=\"hr-math\"></p>\n<p class=\"math-label\">Max HR = 220 − age</p>\n<table class=\"tbl mini\">\n<caption>Class FITT intensity numbers</caption>\n<tbody>\n<tr><th scope=\"row\">Beginner</th><td>Under 145 BPM</td></tr>\n<tr><th scope=\"row\">Moderate to high</th><td>145–186 BPM</td></tr>\n</tbody>\n</table>\n</div>\n<div id=\"gauge\"></div>\n</div>",
          "simple": "Do 220 minus your age. That number is your max heart rate. On the class chart, beginners stay under 145 beats per minute. Moderate to high is 145 to 186."
        },
        {
          "id": "u2-hrnotes",
          "title": "Heart rate notes",
          "html": "<blockquote>“I am fit if my HR is in the low-mid end of my target zone with moderate to high intensity exercise.”</blockquote>\n<p><strong>True/False, “We want to target an INCREASED resting heart rate”:</strong> False (we want a lower resting heart rate).</p>\n<p><strong>Two ways to increase intensity on cardio machines:</strong> increase the speed and increase the incline/resistance.</p>\n<p><strong>CDC recommendation:</strong> children and adolescents should get 60 minutes of physical activity daily, with a minimum of 20 minutes of cardiovascular activity.</p>",
          "simple": "You want a low resting heart rate, not a high one. If you are fit, your heart rate stays lower in your zone even when you work hard. To make a cardio machine harder, go faster or raise the incline/resistance."
        },
        {
          "id": "u2-fitt",
          "title": "FITT principle",
          "html": "<p class=\"lead\">FITT principle (cardio)</p>\n<table class=\"tbl fitt\">\n<thead><tr><th scope=\"col\"></th><th scope=\"col\">Beginner</th><th scope=\"col\">Moderate to high</th></tr></thead>\n<tbody>\n<tr><th scope=\"row\"><b>F</b>Frequency<small>How often</small></th><td>3–5 days per week</td><td>5–7 days per week</td></tr>\n<tr><th scope=\"row\"><b>I</b>Intensity<small>How hard</small></th><td>Less than 145 BPM</td><td>145–186 BPM</td></tr>\n<tr><th scope=\"row\"><b>T</b>Time<small>How long</small></th><td>20–30 minutes</td><td>30–60 minutes</td></tr>\n<tr><th scope=\"row\"><b>T</b>Type<small>Which exercises</small></th><td colspan=\"2\">A continuous activity that is aerobic (requires oxygen), e.g. running, elliptical, swimming</td></tr>\n</tbody>\n</table>\n<p class=\"spaced\"><strong>Review sheet fill-in:</strong> exercise <mark>3</mark> days minimum per week, at a moderate to vigorous level of intensity, for at least <mark>20</mark> minutes.</p>\n<p><strong>SMART + FITT example:</strong> “I will run 3 miles with a 7:30 mile pace by April 30th. I will complete 3 short runs at 20 minutes and 2 long runs a week at 30 minutes.”</p>",
          "simple": "FITT is 4 questions for planning exercise. How often? How hard? How long? What kind?"
        }
      ]
    },
    {
      "id": "u3",
      "num": "03",
      "title": "Muscular Fitness",
      "short": "Muscular",
      "sections": [
        {
          "id": "u3-defs",
          "title": "Strength vs. endurance",
          "html": "<table class=\"tbl plain\">\n<tbody>\n<tr><th scope=\"row\">Muscular strength</th><td>The maximum force that can be generated by a specific muscle or muscle group</td></tr>\n<tr><th scope=\"row\">Muscular endurance</th><td>The ability of your muscles to perform physical tasks and sustain repeated contractions over a long period of time</td></tr>\n</tbody>\n</table>",
          "simple": "Strength means how much force your muscles can make. Endurance means how long your muscles can keep going."
        },
        {
          "id": "u3-protocol",
          "title": "Training protocols",
          "tool": true,
          "html": "<table class=\"protocol\">\n<thead>\n<tr>\n<th scope=\"col\"><span class=\"vh\">Measure</span></th>\n<th scope=\"col\">\n<svg aria-hidden=\"true\" viewbox=\"0 0 160 60\"><path d=\"M8 30h144\" stroke=\"currentColor\" stroke-width=\"4\"></path><path d=\"M24 4h9v52h-9zM36 10h9v40h-9zM48 16h7v28h-7zM127 4h9v52h-9zM115 10h9v40h-9zM105 16h7v28h-7z\" fill=\"currentColor\"></path></svg>\nMuscular Strength\n</th>\n<th scope=\"col\">\n<svg aria-hidden=\"true\" viewbox=\"0 0 160 60\"><path d=\"M8 30h144\" stroke=\"currentColor\" stroke-width=\"4\"></path><path d=\"M36 18h7v24h-7zM117 18h7v24h-7z\" fill=\"currentColor\"></path></svg>\nMuscular Endurance\n</th>\n</tr>\n</thead>\n<tbody>\n<tr><th scope=\"row\">Sets</th><td class=\"stat\">3</td><td class=\"stat\">3</td></tr>\n<tr><th scope=\"row\">Reps</th><td><span class=\"stat\">4–8</span><span class=\"dots\" data-dots=\"4,8\"></span></td><td><span class=\"stat\">12–16</span><span class=\"dots\" data-dots=\"12,16\"></span></td></tr>\n<tr><th scope=\"row\">Load</th><td class=\"stat\">Moderate/<wbr/>heavy</td><td class=\"stat\">Lighter</td></tr>\n<tr><th scope=\"row\">% of 1 Rep Max</th><td><span class=\"stat\">80%</span><span class=\"pct\"><i style=\"width:80%\"></i></span></td><td><span class=\"stat\">60%</span><span class=\"pct\"><i style=\"width:60%\"></i></span></td></tr>\n<tr><th scope=\"row\">Rest period</th><td class=\"stat\">2–3 min</td><td class=\"stat\">30–60 sec</td></tr>\n</tbody>\n</table>",
          "simple": "For strength: heavy weight, few reps, long rest. For endurance: light weight, many reps, short rest. Both use 3 sets."
        },
        {
          "id": "u3-movein",
          "title": "Move-in day example",
          "tool": true,
          "html": "<div class=\"movein\">\n<figure>\n<svg aria-label=\"A heavy refrigerator being lifted off a truck\" role=\"img\" viewbox=\"0 0 300 180\">\n<path d=\"M10 130h190v18H10z\" fill=\"var(--ink)\"></path>\n<path d=\"M200 92h52l32 30v26h-84z\" fill=\"none\" stroke=\"var(--ink)\" stroke-width=\"4\"></path>\n<circle cx=\"52\" cy=\"154\" fill=\"var(--paper)\" r=\"15\" stroke=\"var(--ink)\" stroke-width=\"4\"></circle>\n<circle cx=\"238\" cy=\"154\" fill=\"var(--paper)\" r=\"15\" stroke=\"var(--ink)\" stroke-width=\"4\"></circle>\n<rect fill=\"var(--accent)\" height=\"104\" width=\"74\" x=\"72\" y=\"14\"></rect>\n<path d=\"M72 50h74\" stroke=\"var(--paper)\" stroke-width=\"3\"></path>\n<path d=\"M84 26v14M84 60v24\" stroke=\"var(--paper)\" stroke-width=\"4\"></path>\n<path d=\"M168 104V30m-12 14l12-14 12 14\" fill=\"none\" stroke=\"var(--ink)\" stroke-width=\"3\"></path>\n</svg>\n<figcaption><strong>Strength</strong> is lifting the heavy refrigerator off the truck.</figcaption>\n</figure>\n<figure>\n<svg aria-label=\"20 light cardboard boxes next to three flights of stairs\" id=\"boxes-svg\" role=\"img\" viewbox=\"0 0 300 180\"></svg>\n<figcaption><strong>Endurance</strong> is carrying 20 light cardboard boxes up three flights of stairs.</figcaption>\n</figure>\n</div>"
        },
        {
          "id": "u3-1rm",
          "title": "1 Rep Max calculator",
          "tool": true,
          "html": "<div class=\"calc-grid\">\n<div>\n<label class=\"field\" for=\"orm\">Your 1RM (lbs)</label>\n<input class=\"num-input\" id=\"orm\" inputmode=\"decimal\" min=\"1\" type=\"number\" value=\"60\"/>\n<p class=\"note\">Class example: 6 reps at 50 lbs = estimated 1RM of 60 lbs.</p>\n</div>\n<div aria-live=\"polite\" class=\"orm-out\" id=\"orm-out\"></div>\n</div>",
          "simple": "1RM means the most weight you can lift one time. Times it by 0.6 to get your endurance weight. Times it by 0.8 to get your strength weight."
        },
        {
          "id": "u3-terms",
          "title": "Terms",
          "html": "<table class=\"tbl plain\">\n<tbody>\n<tr><th scope=\"row\">Repetition (rep)</th><td>How many times you repeat a muscle movement</td></tr>\n<tr><th scope=\"row\">Set</th><td>A group of consecutive repetitions (3 × 10 = 3 sets of 10 reps)</td></tr>\n<tr><th scope=\"row\">Super sets</th><td>Exercising opposite muscle groups back to back (e.g. pecs/lats)</td></tr>\n<tr><th scope=\"row\">One Rep Max (1RM)</th><td>The maximum amount of weight one can lift in a single repetition for a given exercise. It’s used to set your load as a percentage of your 1RM: 60% for endurance, 80% for strength.</td></tr>\n</tbody>\n</table>",
          "simple": "A rep is doing the move 1 time. A set is a group of reps. Super sets are working opposite muscles back to back. 1RM is the most you can lift 1 time."
        },
        {
          "id": "u3-law",
          "title": "Law of Use",
          "html": "<blockquote>“That which is used develops… and that which is not used wastes away!”</blockquote>\n<p>(If you don’t use it, you lose it.)</p>\n<div class=\"hyper\">\n<figure>\n<svg aria-hidden=\"true\" viewbox=\"0 0 120 120\"><circle cx=\"60\" cy=\"60\" fill=\"var(--accent)\" r=\"52\"></circle></svg>\n<figcaption><strong>Hypertrophy:</strong> muscles become larger and stronger (example: lifting regularly makes your biceps grow).</figcaption>\n</figure>\n<figure>\n<svg aria-hidden=\"true\" viewbox=\"0 0 120 120\"><circle cx=\"60\" cy=\"60\" fill=\"none\" r=\"52\" stroke=\"var(--rule)\" stroke-dasharray=\"5 5\" stroke-width=\"2\"></circle><circle cx=\"60\" cy=\"60\" fill=\"var(--ink)\" r=\"26\"></circle></svg>\n<figcaption><strong>Atrophy:</strong> muscles become smaller and weaker (example: a leg shrinking after weeks in a cast).</figcaption>\n</figure>\n</div>",
          "simple": "Use it or lose it. If you use a muscle, it grows. That is hypertrophy. If you stop using it, it shrinks. That is atrophy."
        },
        {
          "id": "u3-rest",
          "title": "Rest and recovery",
          "html": "<p>A muscle group needs about <strong class=\"callout\">48 hours</strong> of rest between strength workouts.</p>",
          "simple": "After strength training, give those muscles about 48 hours of rest before you train them again."
        },
        {
          "id": "u3-technique",
          "title": "Proper technique",
          "html": "<ul class=\"cols\">\n<li>Warm-up</li><li>Full range of motion (ROM)</li><li>Proper amount of weight</li>\n<li>Controlled smooth movements</li><li>Use a spotter (free weights)</li><li>Adjust the machine</li>\n</ul>\n<p class=\"spaced\"><strong>Why proper technique is important (2 reasons):</strong> to get the desired results, and to avoid injury.</p>",
          "simple": "Do the exercise the right way. You get better results and you don’t get hurt."
        },
        {
          "id": "u3-warmup",
          "title": "Warm-up",
          "html": "<p class=\"lead\">Importance of a proper warm-up</p>\n<ul class=\"ruled\">\n<li>Faster muscle contraction: muscles contract faster and more forcefully</li>\n<li>Ligaments and tendons are more pliable and less prone to injury</li>\n<li>Less cardiovascular stress</li>\n<li>Accelerated nerve impulses</li>\n<li>Psychological readiness</li>\n</ul>",
          "simple": "Warm up first. It gets your muscles, nerves and mind ready, and you are less likely to get hurt."
        },
        {
          "id": "u3-opposing",
          "title": "Opposing muscles",
          "html": "<p>Work opposite muscles to avoid a muscle imbalance (quadriceps &amp; hamstrings, pectorals &amp; lats).</p>",
          "simple": "Muscles come in opposite pairs. Train both, so one doesn’t get stronger than the other."
        },
        {
          "id": "u3-principles",
          "title": "Training principles",
          "html": "<h3>Overload principle</h3>\n<p>The body will respond by getting stronger when increased demands are placed upon it. It must be gradual and progressive, because too much overload leads to injury and fatigue.</p>\n<h3>Principle of progression</h3>\n<p>Gradual increase of the demands placed on the body to get increased results. Start out slowly with lighter weights, then increase systematically as the body adapts.</p>\n<p>Example: Milo of Croton carried a newborn calf every day until it grew into a bull.</p>\n<h3>Principle of specificity</h3>\n<p>The body adapts “specifically” to the demands placed upon it (force, speed, angle).</p>",
          "simple": "Overload: do more than your body is used to, and it gets stronger. Don’t add too much at once. Progression: start light and add a little at a time. Specificity: your body gets better at the exact thing you train."
        },
        {
          "id": "u3-benefits",
          "title": "Benefits",
          "html": "<p class=\"lead\">Benefits of muscular fitness</p>\n<ul class=\"cols\">\n<li>Increased energy</li><li>Increased self-esteem</li><li>Improved physical performance</li><li>Injury prevention</li>\n<li>Better sleep</li><li>Improved health</li><li>Lower levels of fat</li><li>Increased life expectancy</li>\n<li>Less muscular fatigue</li><li>Athletic performance</li><li>Protects bone density</li>\n</ul>",
          "simple": "Strong muscles give you more energy, more confidence, better sleep and stronger bones. You also get hurt less."
        }
      ]
    },
    {
      "id": "u4",
      "num": "04",
      "title": "Muscles & Machines",
      "short": "Muscles",
      "sections": [
        {
          "id": "u4-map",
          "title": "Muscle map",
          "tool": true,
          "html": "<div class=\"map\" id=\"map\">\n<div class=\"map-main\">\n<div aria-label=\"Muscle map mode\" class=\"seg\" id=\"map-modes\" role=\"group\">\n<button aria-pressed=\"true\" class=\"is-on\" data-mode=\"explore\">Muscles</button>\n<button aria-pressed=\"false\" data-mode=\"machines\">Machines</button>\n<button aria-pressed=\"false\" data-mode=\"quiz\">Quiz mode</button>\n<button aria-pressed=\"false\" data-mode=\"type\">Type it</button>\n</div>\n<div class=\"machine-list\" hidden=\"\" id=\"machine-list\"></div>\n<div id=\"figure\"></div>\n</div>\n<div aria-live=\"polite\" class=\"map-panel\" id=\"map-panel\"></div>\n</div>"
        },
        {
          "id": "u4-key",
          "title": "Chart key",
          "html": "<p class=\"hidden-note\" hidden=\"\" id=\"key-hidden\">The key is hidden during the quizzes.</p>\n<table class=\"tbl key\" id=\"key-table\">\n<thead><tr><th scope=\"col\">#</th><th scope=\"col\">Muscle</th><th scope=\"col\">Machine / exercise</th></tr></thead>\n<tbody id=\"key-body\"></tbody>\n</table>",
          "simple": "Each number is 1 muscle. The last column shows which machine works it. A dash means no machine on the class list works that muscle."
        }
      ]
    },
    {
      "id": "u5",
      "num": "05",
      "title": "Body Composition",
      "short": "Body comp",
      "sections": [
        {
          "id": "u5-what",
          "title": "What it is",
          "html": "<p><strong>Body composition:</strong> the relative comparison of body fat to lean body mass (muscle, bone, organs). It compares both body fat and lean body mass.</p>\n<p class=\"lead\">Example: 150 lb body weight × 20% body fat</p>\n<div aria-label=\"30 pounds fat weight and 120 pounds fat-free weight\" class=\"split-bar\" role=\"img\">\n<span class=\"fat\" style=\"width:20%\">30 lbs</span><span class=\"lean\" style=\"width:80%\">120 lbs</span>\n</div>\n<p class=\"bar-key\"><span>Fat weight</span><span>Fat-free weight</span></p>\n<p><strong>Why know it:</strong> evaluate your health, plan a better program for weight management, evaluate your progress on an exercise and nutrition plan.</p>",
          "simple": "Body composition means how much of you is fat and how much is not fat. Muscle, bone and organs are the not-fat part. In the example, 30 lbs is fat and 120 lbs is not."
        },
        {
          "id": "u5-functions",
          "title": "Functions of body fat",
          "html": "<ol class=\"numbered\">\n<li>Normal physiological functioning</li>\n<li>Protection of organs from bodily harm</li>\n<li>Insulation and body temperature regulation</li>\n<li>Absorption of fat-soluble vitamins (A, D, E &amp; K)</li>\n<li>Energy source (stored energy)</li>\n</ol>",
          "simple": "You need some body fat. It protects your organs, keeps you warm, helps you use some vitamins and stores energy."
        },
        {
          "id": "u5-types",
          "title": "Two types of fat",
          "tool": true,
          "html": "<div class=\"fat-grid\">\n<svg aria-label=\"Cross-section of the torso. Subcutaneous fat is a layer just under the skin. Visceral fat sits around the organs.\" role=\"img\" viewbox=\"0 0 460 330\">\n<ellipse cx=\"230\" cy=\"172\" fill=\"var(--tint)\" rx=\"175\" ry=\"120\" stroke=\"var(--ink)\" stroke-width=\"4\"></ellipse>\n<ellipse cx=\"230\" cy=\"172\" fill=\"var(--shape)\" rx=\"150\" ry=\"96\" stroke=\"var(--ink)\" stroke-width=\"1\"></ellipse>\n<ellipse cx=\"230\" cy=\"172\" fill=\"var(--paper)\" rx=\"130\" ry=\"78\" stroke=\"var(--ink)\" stroke-width=\"1\"></ellipse>\n<g fill=\"var(--accent)\">\n<circle cx=\"150\" cy=\"150\" r=\"24\"></circle><circle cx=\"178\" cy=\"196\" r=\"28\"></circle><circle cx=\"224\" cy=\"132\" r=\"22\"></circle>\n<circle cx=\"282\" cy=\"138\" r=\"24\"></circle><circle cx=\"312\" cy=\"178\" r=\"26\"></circle><circle cx=\"272\" cy=\"212\" r=\"26\"></circle>\n<circle cx=\"226\" cy=\"214\" r=\"18\"></circle><circle cx=\"222\" cy=\"172\" r=\"18\"></circle>\n</g>\n<g fill=\"#7d7f7d\" stroke=\"var(--ink)\" stroke-width=\"1.500\">\n<path d=\"M152 164c0-22 28-30 44-18s10 42-10 42-34-6-34-24z\"></path>\n<path d=\"M246 150c14-14 54-10 58 12s-22 36-40 30-30-30-18-42z\"></path>\n<circle cx=\"222\" cy=\"186\" r=\"11\"></circle>\n</g>\n<g fill=\"none\" stroke=\"var(--ink)\" stroke-width=\"1.500\">\n<path d=\"M50 28v76l40 24\"></path>\n<path d=\"M410 28v50l-74 92\"></path>\n<path d=\"M230 304v-45\"></path>\n<path d=\"M350 304l-68-114\"></path>\n<path d=\"M46 304l50-55\"></path>\n</g>\n<g class=\"svg-label\">\n<text x=\"10\" y=\"20\">Subcutaneous fat</text>\n<text text-anchor=\"end\" x=\"450\" y=\"20\">Visceral fat</text>\n<text x=\"10\" y=\"322\">Skin</text>\n<text text-anchor=\"middle\" x=\"230\" y=\"322\">Muscle</text>\n<text text-anchor=\"middle\" x=\"350\" y=\"322\">Organs</text>\n</g>\n</svg>\n<div>\n<h3>Subcutaneous</h3>\n<p>Fat stored just underneath the skin; the fat you can feel on your arms and legs. It’s for warmth and protection, as well as storage of extra energy.</p>\n<h3>Visceral</h3>\n<p>Fat stored in and around internal organs and the torso, also known as intra-abdominal fat or organ fat. Excess can lead to increased risk for health problems (heart disease, type 2 diabetes). It’s usually the first fat to be lost in weight loss.</p>\n</div>\n</div>",
          "simple": "There are 2 kinds of fat. Subcutaneous fat is right under your skin. You can feel it. Visceral fat is deep inside, around your organs. Too much visceral fat is bad for your health, but it usually comes off first."
        },
        {
          "id": "u5-versus",
          "title": "Fat vs. muscle",
          "html": "<p class=\"lead\">Two different tissues</p>\n<table class=\"tbl stack\">\n<thead><tr><th scope=\"col\"></th><th scope=\"col\">Muscle</th><th scope=\"col\">Fat</th></tr></thead>\n<tbody>\n<tr><th scope=\"row\">Properties</th><td data-label=\"Muscle\">Fibrous, contractible and connective tissue</td><td data-label=\"Fat\">Lipids, adipose tissue</td></tr>\n<tr><th scope=\"row\">Weight / density</th><td data-label=\"Muscle\">Heavier / more dense</td><td data-label=\"Fat\">Lighter / less dense</td></tr>\n<tr><th scope=\"row\">Function</th><td data-label=\"Muscle\">Moves the body and maintains posture</td><td data-label=\"Fat\">Protection, insulation and a source of energy</td></tr>\n<tr><th scope=\"row\">Response to exercise</th><td data-label=\"Muscle\">Increases with exercise</td><td data-label=\"Fat\">Decreases with exercise</td></tr>\n</tbody>\n</table>\n<p class=\"poster-line\">Fat can NOT be converted to muscle.</p>",
          "simple": "Muscle and fat are 2 different things. Fat can’t turn into muscle. Muscle is heavier and moves your body. Fat is lighter and protects you, keeps you warm and stores energy."
        },
        {
          "id": "u5-bmi",
          "title": "BMI",
          "html": "<p><strong>BMI (Body Mass Index):</strong> a measure of relative size based on the mass (weight) and height of an individual.</p>\n<p>Still widely used to screen for weight categories that may lead to health problems.</p>\n<p><strong>Problem:</strong> BMI does not account for age, sex, ethnicity or muscle mass.</p>",
          "simple": "BMI is a number based on your weight and height. The problem is that it ignores your age, sex, ethnicity and how much muscle you have."
        },
        {
          "id": "u5-methods",
          "title": "Measurement methods",
          "html": "<table class=\"tbl methods\" id=\"method-table\"><tbody></tbody></table>",
          "simple": "These are 5 ways to measure body fat. Hydrostatic weighing is the gold standard. Skinfold calipers cost the least."
        },
        {
          "id": "u5-match",
          "title": "Match the method",
          "tool": true,
          "html": "<p class=\"hint\">Tap a method, then tap its description.</p>\n<div id=\"matcher\"></div>"
        },
        {
          "id": "u5-percent",
          "title": "Recommended body fat %",
          "html": "<p class=\"lead\">Ages 20–40</p>\n<div class=\"bf\">\n<div><span class=\"bf-n\">About 12–18%</span>Males</div>\n<div><span class=\"bf-n\">About 18–24%</span>Females</div>\n</div>",
          "simple": "These are good body fat numbers for adults ages 20–40. The numbers for females are higher than for males."
        },
        {
          "id": "u5-timeline",
          "title": "Fat cell timeline",
          "tool": true,
          "html": "<div aria-label=\"Fat cell timeline\" class=\"timeline-scroll\" role=\"region\" tabindex=\"0\">\n<ol class=\"timeline\" id=\"timeline\"></ol>\n</div>\n<p class=\"swipe-note\">Swipe the timeline sideways to see all 4 stages.</p>",
          "simple": "When you are little, you get fat cells fast. By your early twenties, the number is set. After that, your fat cells get bigger or smaller, but the number stays the same."
        },
        {
          "id": "u5-cells",
          "title": "Fat cell notes",
          "html": "<ul class=\"ruled\">\n<li>Fat cell development is rapid in the first few years of life.</li>\n<li>During growth, fat cells increase in number.</li>\n<li>Fat cell number is set by your early twenties. After this, they increase in size.</li>\n<li>When energy intake exceeds expenditure, fat cells increase in size.</li>\n<li>With fat loss, the size of fat cells shrinks, but not the number.</li>\n<li><strong>True/False, “The number of fat cells reduces in your lifetime”:</strong> False.</li>\n<li>If fat cells have enlarged and energy intake keeps exceeding expenditure, fat cells can increase in number again.</li>\n<li>Your lifestyle and dietary habits as a teenager are factors in determining your health as an adult.</li>\n</ul>",
          "simple": "When you lose fat, your fat cells get smaller. They don’t go away. If they are already big and you keep eating more energy than you use, you can get more of them."
        }
      ]
    },
    {
      "id": "u6",
      "num": "06",
      "title": "Flexibility",
      "short": "Flexibility",
      "sections": [
        {
          "id": "u6-what",
          "title": "What it is",
          "html": "<p><strong>Flexibility:</strong> the ability to move a joint through its normal range of motion (ROM).</p><p><strong>Fitness test:</strong> the sit &amp; reach test.</p><p>Flexibility is one of the 5 health-related fitness components.</p>",
          "simple": "Flexibility is how far your joints can bend and move. The sit and reach test checks it."
        },
        {
          "id": "u6-types",
          "title": "Types of stretching",
          "html": "<p class=\"lead\">4 types of stretching</p><table class=\"tbl stack\"><thead><tr><th scope=\"col\">Type</th><th scope=\"col\">What it is</th><th scope=\"col\">Example</th></tr></thead><tbody><tr><th scope=\"row\">Static</th><td data-label=\"What it is\">Stretching a muscle and holding it still in one position, usually for 15–30 seconds. Best after exercise, as part of a cool-down.</td><td data-label=\"Example\">Sitting hamstring stretch (reach for your toes and hold)</td></tr><tr><th scope=\"row\">Dynamic</th><td data-label=\"What it is\">Moving parts of your body through their full range of motion in a controlled way. Best before exercise, as part of a warm-up.</td><td data-label=\"Example\">Arm circles, leg swings, walking lunges, high knees</td></tr><tr><th scope=\"row\">PNF</th><td data-label=\"What it is\">Proprioceptive Neuromuscular Facilitation. Stretch a muscle, contract (push) it against resistance for a few seconds, then relax and stretch it further. Usually done with a partner.</td><td data-label=\"Example\">Partner hamstring stretch: push your leg against your partner’s hands, relax, then stretch farther</td></tr><tr><th scope=\"row\">Ballistic</th><td data-label=\"What it is\">Bouncing or jerky movements that push a muscle past its normal range of motion. It has a higher risk of injury, so it isn’t recommended for most people.</td><td data-label=\"Example\">Bouncing toe touches</td></tr></tbody></table>",
          "simple": "Static: stretch and hold still. Dynamic: stretch while moving. PNF: stretch, push against a partner, then stretch more. Ballistic: bouncing stretches, which can hurt you."
        },
        {
          "id": "u6-benefits",
          "title": "Benefits",
          "html": "<p class=\"lead\">Benefits of good flexibility</p><ul class=\"cols\"><li>Better range of motion</li><li>Fewer injuries</li><li>Better posture</li><li>Less muscle soreness and tightness</li><li>Less lower back pain</li><li>Better athletic performance</li><li>Better balance and coordination</li><li>More blood flow to the muscles</li><li>Less stress, more relaxed</li></ul>",
          "simple": "Being flexible means you get hurt less, stand up straighter, feel less sore and move better in sports."
        },
        {
          "id": "u6-safe",
          "title": "Stretching safely",
          "html": "<ul class=\"ruled\"><li>Warm up before you stretch. Warm muscles stretch more easily.</li><li>Hold static stretches for about 15–30 seconds.</li><li>Stretch to a feeling of mild tension, never pain.</li><li>Breathe normally. Don’t hold your breath.</li><li>Don’t bounce, unless your coach has you doing ballistic stretching for a sport.</li></ul>",
          "simple": "Warm up first, hold each stretch for a bit, and stop if it hurts."
        }
      ]
    },
    {
      "id": "u7",
      "num": "07",
      "title": "Nutrition",
      "short": "Nutrition",
      "sections": [
        {
          "id": "u7-calories",
          "title": "Calories",
          "html": "<p><strong>Calorie:</strong> a unit of energy we get from food.</p><p class=\"lead\">Daily calorie intake should be based on</p><ul class=\"quad\"><li>Age</li><li>Sex</li><li>Height/weight</li><li>Activity level</li></ul><table class=\"tbl plain\"><caption>Calories children and adolescents need</caption><tbody><tr><th scope=\"row\">Sedentary (not active)</th><td>About 1,200</td></tr><tr><th scope=\"row\">Active</th><td>About 2,000</td></tr></tbody></table>",
          "simple": "A calorie is energy from food. How much you need depends on your age, sex, size and how active you are."
        },
        {
          "id": "u7-metabolism",
          "title": "Metabolism and BMR",
          "html": "<table class=\"tbl plain\"><tbody><tr><th scope=\"row\">Metabolism</th><td>All the chemical processes in your body that turn food into the energy it needs to live and move</td></tr><tr><th scope=\"row\">Basal metabolic rate (BMR)</th><td>The number of calories your body burns at complete rest, just to keep basic functions going (breathing, heartbeat, body temperature)</td></tr></tbody></table>",
          "simple": "Metabolism is how your body turns food into energy. BMR is how many calories you burn just by being alive, even sitting still."
        },
        {
          "id": "u7-weight",
          "title": "Weight control formula",
          "html": "<p class=\"poster-line\">Calories in vs. calories out</p><table class=\"tbl plain\"><tbody><tr><th scope=\"row\">Calories in</th><td>Eating and drinking. Gives your body the energy (fuel) it needs.</td></tr><tr><th scope=\"row\">Calories out</th><td>How you burn calories: your BMR, daily activities and exercise.</td></tr></tbody></table><table class=\"tbl eq\"><tbody><tr><td>More in than out</td><td class=\"eq-s\">=</td><td>Weight gain</td></tr><tr><td>More out than in</td><td class=\"eq-s\">=</td><td>Weight loss</td></tr><tr><td>In equals out</td><td class=\"eq-s\">=</td><td>Weight stays the same</td></tr></tbody></table><p class=\"spaced\">1 pound of fat = <strong class=\"callout\">3,500 calories</strong></p><p><strong>Safe, long-term weight loss:</strong> 1–2 pounds per week.</p>",
          "simple": "If you eat more energy than you use, you gain weight. If you use more than you eat, you lose weight. Losing 1 pound means burning 3,500 extra calories."
        },
        {
          "id": "u7-nutrients",
          "title": "Six essential nutrients",
          "html": "<ol class=\"numbered\"><li>Carbohydrates</li><li>Fats</li><li>Proteins</li><li>Vitamins</li><li>Minerals</li><li>Water</li></ol><p class=\"spaced\"><strong>Primary fuel when exercising:</strong> carbohydrates. <strong>Secondary:</strong> fat.</p>",
          "simple": "Your body needs 6 things from food: carbs, fats, proteins, vitamins, minerals and water. Carbs are your main fuel for exercise."
        },
        {
          "id": "u7-chart",
          "title": "Carbs, fats and proteins",
          "html": "<table class=\"tbl stack\"><thead><tr><th scope=\"col\">Nutrient</th><th scope=\"col\">Food sources</th><th scope=\"col\">Function in the body</th><th scope=\"col\">Calories per gram</th><th scope=\"col\">% of calories in diet</th></tr></thead><tbody><tr><th scope=\"row\">Carbohydrates</th><td data-label=\"Food sources\">Bread, pasta, rice, cereal, potatoes, fruits, vegetables</td><td data-label=\"Function in the body\">The body’s main source of energy, for the muscles and the brain</td><td data-label=\"Calories per gram\">4</td><td data-label=\"% of calories in diet\">45–65%</td></tr><tr><th scope=\"row\">Fats</th><td data-label=\"Food sources\">Oils, butter, nuts, avocado, meat, cheese</td><td data-label=\"Function in the body\">Stored energy, insulation, protects organs, helps absorb vitamins A, D, E &amp; K</td><td data-label=\"Calories per gram\">9</td><td data-label=\"% of calories in diet\">20–35%</td></tr><tr><th scope=\"row\">Proteins</th><td data-label=\"Food sources\">Meat, fish, eggs, beans, nuts, milk, yogurt</td><td data-label=\"Function in the body\">Builds and repairs muscles and other tissues</td><td data-label=\"Calories per gram\">4</td><td data-label=\"% of calories in diet\">10–35%</td></tr></tbody></table>",
          "simple": "Carbs give you energy. Fats store energy and protect you. Proteins build muscle. Carbs and proteins have 4 calories per gram, and fat has 9."
        },
        {
          "id": "u7-fat",
          "title": "Fat cells and body fat",
          "html": "<p><strong>Fat cells develop until:</strong> your early twenties. After that, they grow in size, not in number.</p><p class=\"lead\">Recommended body fat %</p><div class=\"bf\"><div><span class=\"bf-n\">About 12–18%</span>Men</div><div><span class=\"bf-n\">About 18–24%</span>Women</div></div>",
          "simple": "You keep making new fat cells until about your early 20s. After that they only get bigger or smaller."
        },
        {
          "id": "u7-math",
          "title": "Apply what you know",
          "html": "<p><strong>You just ate a snack with 4 grams of carbs and 2 grams of fat. How many calories did you just consume?</strong></p><table class=\"tbl plain\"><tbody><tr><th scope=\"row\">Carbs</th><td>4 g × 4 calories = 16 calories</td></tr><tr><th scope=\"row\">Fat</th><td>2 g × 9 calories = 18 calories</td></tr><tr><th scope=\"row\">Total</th><td><strong>16 + 18 = 34 calories</strong></td></tr></tbody></table>",
          "simple": "Multiply grams of carbs and protein by 4, and grams of fat by 9, then add them up."
        }
      ]
    }
  ],
  "flashcards": [
    {
      "u": 1,
      "front": "4 domains of wellness",
      "back": "Physical, Emotional, Intellectual, Social"
    },
    {
      "u": 1,
      "front": "What does physical activity enhance?",
      "back": "The intellectual, emotional AND social aspects of health"
    },
    {
      "u": 1,
      "front": "Muscular Strength",
      "back": "Maximum force a muscle group can exert against resistance\n\nTest: Push-up test",
      "simple": "How hard your muscles can push."
    },
    {
      "u": 1,
      "front": "Muscular Endurance",
      "back": "The ability of a muscle to repeatedly exert force over a prolonged period of time\n\nTest: Curl-up test",
      "simple": "How long your muscles can keep going."
    },
    {
      "u": 1,
      "front": "Cardiovascular Endurance",
      "back": "The ability of your heart and lungs to supply oxygen to your body during sustained physical activity\n\nTest: PACER test",
      "simple": "How long your heart and lungs can keep going."
    },
    {
      "u": 1,
      "front": "Flexibility",
      "back": "The ability to move a joint through normal range of motion (ROM)\n\nTest: Sit & reach test",
      "simple": "How well your joints move."
    },
    {
      "u": 1,
      "front": "Body Composition",
      "back": "The relative comparison of body fat to lean body mass (muscle, bone, organs)",
      "simple": "How much of you is fat and how much is not."
    },
    {
      "u": 1,
      "front": "Benefits of physical fitness",
      "back": "Improved health, stronger heart, improves mood, increased energy levels, lowers risk of noncommunicable diseases, sleep better, avoid injuries, better self-control, happier with how you see yourself, increased life expectancy, better physical performance"
    },
    {
      "u": 1,
      "front": "RPE: moderate activity",
      "back": "Breathing heavily, can hold a short conversation. Still somewhat comfortable, but becoming noticeably more challenging."
    },
    {
      "u": 1,
      "front": "RPE: vigorous activity",
      "back": "Borderline uncomfortable. Short of breath, can speak a sentence."
    },
    {
      "u": 1,
      "front": "What does RPE stand for?",
      "back": "Rate of Perceived Exertion"
    },
    {
      "u": 1,
      "front": "Lifetime activities",
      "back": "Activities you can do during any phase of your lifetime: group fitness, swimming, walk/jog, tennis, biking, golf"
    },
    {
      "u": 1,
      "front": "SMART goals",
      "back": "Specific (& written)\nMeasurable\nAttainable (yet challenging)\nRealistic\nTime frame",
      "simple": "A clear goal you can measure, with a due date."
    },
    {
      "u": 1,
      "front": "SMART goal: strength example",
      "back": "“I will increase my maximum bench press to 150 pounds by December 31.”"
    },
    {
      "u": 1,
      "front": "SMART goal: cardio example",
      "back": "“I will be able to run nonstop for 30 minutes by June 1.”"
    },
    {
      "u": 2,
      "front": "The #1 killer worldwide",
      "back": "Cardiovascular disease"
    },
    {
      "u": 2,
      "front": "Cardiovascular endurance",
      "back": "The ability to persist in physical activities that rely on the heart, blood vessels and lungs to supply oxygen to the working muscles"
    },
    {
      "u": 2,
      "front": "Function of the heart",
      "back": "To pump oxygenated blood to various parts of the body"
    },
    {
      "u": 2,
      "front": "Cardiovascular fitness can most drastically affect…",
      "back": "Life expectancy"
    },
    {
      "u": 2,
      "front": "Risk factor",
      "back": "A major factor in your life that would increase your risk for a premature death",
      "simple": "Something that makes you more likely to die young."
    },
    {
      "u": 2,
      "front": "Controllable risk factors",
      "back": "Inactivity, smoking, stress, high blood pressure, cholesterol, obesity"
    },
    {
      "u": 2,
      "front": "Non-controllable risk factors",
      "back": "Biological sex, heredity, age"
    },
    {
      "u": 2,
      "front": "Benefits of cardiovascular fitness",
      "back": "Stronger heart = lower blood pressure\nDecreased body fat = less obesity\nImproved circulation = lower blood pressure\nFaster recovery time = improved performance\nPumps more blood per beat = less stress on system\nLess risk of CV disease = decreased cholesterol"
    },
    {
      "u": 2,
      "front": "Aerobic exercise",
      "back": "“With oxygen.” Oxygen is the energy supply that helps muscles burn fuel and move, so it doesn’t need another energy source. Moderate exercise over an extended period of time.\n\nExamples: biking, swimming, rollerblading, cross-country running",
      "simple": "With oxygen. Steady exercise that lasts a long time."
    },
    {
      "u": 2,
      "front": "Anaerobic exercise",
      "back": "“Without oxygen.” Demand is greater than the supply, so it uses energy stored in the muscles (glucose). Short bursts of intense exercise.\n\nExamples: sprinting, agility ladders, tennis, wrestling",
      "simple": "Without oxygen. A short, super hard burst."
    },
    {
      "u": 2,
      "front": "4 characteristics of cardiovascular activities",
      "back": "Large muscle groups, continuous, rhythmic, aerobic"
    },
    {
      "u": 2,
      "front": "Max heart rate formula",
      "back": "220 − age"
    },
    {
      "u": 2,
      "front": "True or false: We want to target an INCREASED resting heart rate",
      "back": "False. We want a lower resting heart rate."
    },
    {
      "u": 2,
      "front": "When am I fit?",
      "back": "“I am fit if my HR is in the low-mid end of my target zone with moderate to high intensity exercise.”"
    },
    {
      "u": 2,
      "front": "Two ways to increase intensity on cardio machines",
      "back": "Increase the speed and increase the incline/resistance"
    },
    {
      "u": 2,
      "front": "CDC recommendation",
      "back": "Children and adolescents should get 60 minutes of physical activity daily, with a minimum of 20 minutes of cardiovascular activity"
    },
    {
      "u": 2,
      "front": "FITT: Frequency",
      "back": "How often\n\nBeginner: 3–5 days per week\nModerate to high: 5–7 days per week",
      "simple": "How many days a week?"
    },
    {
      "u": 2,
      "front": "FITT: Intensity",
      "back": "How hard\n\nBeginner: Less than 145 BPM\nModerate to high: 145–186 BPM",
      "simple": "How hard is your heart working?"
    },
    {
      "u": 2,
      "front": "FITT: Time",
      "back": "How long\n\nBeginner: 20–30 minutes\nModerate to high: 30–60 minutes",
      "simple": "How many minutes?"
    },
    {
      "u": 2,
      "front": "FITT: Type",
      "back": "Which exercises\n\nA continuous activity that is aerobic (requires oxygen), e.g. running, elliptical, swimming",
      "simple": "What kind of exercise?"
    },
    {
      "u": 2,
      "front": "Review sheet: exercise ___ days minimum per week, at a ___ level of intensity, for at least ___ minutes",
      "back": "Exercise 3 days minimum per week, at a moderate to vigorous level of intensity, for at least 20 minutes"
    },
    {
      "u": 2,
      "front": "SMART + FITT example",
      "back": "“I will run 3 miles with a 7:30 mile pace by April 30th. I will complete 3 short runs at 20 minutes and 2 long runs a week at 30 minutes.”"
    },
    {
      "u": 3,
      "front": "Muscular strength",
      "back": "The maximum force that can be generated by a specific muscle or muscle group",
      "simple": "How much force your muscles can make."
    },
    {
      "u": 3,
      "front": "Muscular endurance",
      "back": "The ability of your muscles to perform physical tasks and sustain repeated contractions over a long period of time",
      "simple": "How long your muscles can keep going."
    },
    {
      "u": 3,
      "front": "Move-in day example",
      "back": "Strength is lifting the heavy refrigerator off the truck.\n\nEndurance is carrying 20 light cardboard boxes up three flights of stairs."
    },
    {
      "u": 3,
      "front": "Muscular strength protocol",
      "back": "Sets: 3\nReps: 4–8\nLoad: Moderate/heavy\n% of 1 Rep Max: 80%\nRest period: 2–3 min"
    },
    {
      "u": 3,
      "front": "Muscular endurance protocol",
      "back": "Sets: 3\nReps: 12–16\nLoad: Lighter\n% of 1 Rep Max: 60%\nRest period: 30–60 sec"
    },
    {
      "u": 3,
      "front": "Repetition (rep)",
      "back": "How many times you repeat a muscle movement",
      "simple": "Doing the move 1 time."
    },
    {
      "u": 3,
      "front": "Set",
      "back": "A group of consecutive repetitions (3 × 10 = 3 sets of 10 reps)",
      "simple": "A group of reps."
    },
    {
      "u": 3,
      "front": "Super sets",
      "back": "Exercising opposite muscle groups back to back (e.g. pecs/lats)",
      "simple": "Opposite muscles, back to back."
    },
    {
      "u": 3,
      "front": "One Rep Max (1RM)",
      "back": "The maximum amount of weight one can lift in a single repetition for a given exercise. It’s used to set your load as a percentage of your 1RM: 60% for endurance, 80% for strength.",
      "simple": "The most you can lift 1 time."
    },
    {
      "u": 3,
      "front": "1RM estimation example",
      "back": "6 reps at 50 lbs = 60 lbs estimated 1RM"
    },
    {
      "u": 3,
      "front": "Law of Use",
      "back": "“That which is used develops… and that which is not used wastes away!”\n\n(If you don’t use it, you lose it.)",
      "simple": "Use it or lose it."
    },
    {
      "u": 3,
      "front": "Hypertrophy",
      "back": "Muscles become larger and stronger (example: lifting regularly makes your biceps grow)",
      "simple": "Muscle grows."
    },
    {
      "u": 3,
      "front": "Atrophy",
      "back": "Muscles become smaller and weaker (example: a leg shrinking after weeks in a cast)",
      "simple": "Muscle shrinks."
    },
    {
      "u": 3,
      "front": "Rest and recovery",
      "back": "A muscle group needs about 48 hours of rest between strength workouts"
    },
    {
      "u": 3,
      "front": "Proper technique",
      "back": "Warm-up\nFull range of motion (ROM)\nProper amount of weight\nControlled smooth movements\nUse a spotter (free weights)\nAdjust the machine"
    },
    {
      "u": 3,
      "front": "Why proper technique is important (2 reasons)",
      "back": "To get the desired results, and to avoid injury"
    },
    {
      "u": 3,
      "front": "Importance of a proper warm-up",
      "back": "Faster muscle contraction: muscles contract faster and more forcefully\nLigaments and tendons are more pliable and less prone to injury\nLess cardiovascular stress\nAccelerated nerve impulses\nPsychological readiness"
    },
    {
      "u": 3,
      "front": "Opposing muscles",
      "back": "Work opposite muscles to avoid a muscle imbalance (quadriceps & hamstrings, pectorals & lats)"
    },
    {
      "u": 3,
      "front": "Overload principle",
      "back": "The body will respond by getting stronger when increased demands are placed upon it. It must be gradual and progressive, because too much overload leads to injury and fatigue.",
      "simple": "Do more than your body is used to, and it gets stronger."
    },
    {
      "u": 3,
      "front": "Principle of progression",
      "back": "Gradual increase of the demands placed on the body to get increased results. Start out slowly with lighter weights, then increase systematically as the body adapts.\n\nExample: Milo of Croton carried a newborn calf every day until it grew into a bull.",
      "simple": "Start light. Add a little at a time."
    },
    {
      "u": 3,
      "front": "Principle of specificity",
      "back": "The body adapts “specifically” to the demands placed upon it (force, speed, angle)",
      "simple": "You get better at the exact thing you train."
    },
    {
      "u": 3,
      "front": "Benefits of muscular fitness",
      "back": "Increased energy, increased self-esteem, improved physical performance, injury prevention, better sleep, improved health, lower levels of fat, increased life expectancy, less muscular fatigue, athletic performance, protects bone density"
    },
    {
      "u": 4,
      "front": "Muscle number 1",
      "back": "Trapezius"
    },
    {
      "u": 4,
      "front": "Muscle number 2",
      "back": "Triceps"
    },
    {
      "u": 4,
      "front": "Muscle number 3",
      "back": "Latissimus Dorsi"
    },
    {
      "u": 4,
      "front": "Muscle number 4",
      "back": "Gluteus Maximus"
    },
    {
      "u": 4,
      "front": "Muscle number 5",
      "back": "Hamstrings"
    },
    {
      "u": 4,
      "front": "Muscle number 6",
      "back": "Gastrocnemius"
    },
    {
      "u": 4,
      "front": "Muscle number 7",
      "back": "Deltoids"
    },
    {
      "u": 4,
      "front": "Muscle number 8",
      "back": "Pectorals"
    },
    {
      "u": 4,
      "front": "Muscle number 9",
      "back": "Abdominals"
    },
    {
      "u": 4,
      "front": "Muscle number 10",
      "back": "Biceps"
    },
    {
      "u": 4,
      "front": "Muscle number 11",
      "back": "Quadriceps"
    },
    {
      "u": 4,
      "front": "Leg curl",
      "back": "Hamstrings"
    },
    {
      "u": 4,
      "front": "Chest press",
      "back": "Pectorals"
    },
    {
      "u": 4,
      "front": "Shoulder press",
      "back": "Deltoids"
    },
    {
      "u": 4,
      "front": "Arm curl",
      "back": "Biceps"
    },
    {
      "u": 4,
      "front": "Leg extension",
      "back": "Quadriceps"
    },
    {
      "u": 4,
      "front": "Leg press",
      "back": "Gluteus maximus and quadriceps"
    },
    {
      "u": 4,
      "front": "Shoulder shrugs",
      "back": "Trapezius (upper back)"
    },
    {
      "u": 4,
      "front": "Seated row",
      "back": "Latissimus dorsi (lower back)"
    },
    {
      "u": 4,
      "front": "Arm extension",
      "back": "Triceps (back of the upper arm)"
    },
    {
      "u": 4,
      "front": "Lunges",
      "back": "Gluteus maximus (backside)"
    },
    {
      "u": 4,
      "front": "Heel raises",
      "back": "Gastrocnemius (back of the lower leg)"
    },
    {
      "u": 5,
      "front": "Body composition",
      "back": "The relative comparison of body fat to lean body mass (muscle, bone, organs). It compares both body fat and lean body mass.",
      "simple": "How much of you is fat and how much is not."
    },
    {
      "u": 5,
      "front": "Body composition example",
      "back": "150 lb body weight × 20% body fat = 30 lbs fat weight and 120 lbs fat-free weight"
    },
    {
      "u": 5,
      "front": "Why know your body composition?",
      "back": "Evaluate your health, plan a better program for weight management, evaluate your progress on an exercise and nutrition plan"
    },
    {
      "u": 5,
      "front": "5 functions of body fat",
      "back": "1. Normal physiological functioning\n2. Protection of organs from bodily harm\n3. Insulation and body temperature regulation\n4. Absorption of fat-soluble vitamins (A, D, E & K)\n5. Energy source (stored energy)"
    },
    {
      "u": 5,
      "front": "Subcutaneous fat",
      "back": "Fat stored just underneath the skin; the fat you can feel on your arms and legs. It’s for warmth and protection, as well as storage of extra energy.",
      "simple": "Fat right under your skin."
    },
    {
      "u": 5,
      "front": "Visceral fat",
      "back": "Fat stored in and around internal organs and the torso, also known as intra-abdominal fat or organ fat. Excess can lead to increased risk for health problems (heart disease, type 2 diabetes). It’s usually the first fat to be lost in weight loss.",
      "simple": "Fat deep inside, around your organs."
    },
    {
      "u": 5,
      "front": "Muscle vs. fat: properties",
      "back": "Muscle: fibrous, contractible and connective tissue\nFat: lipids, adipose tissue"
    },
    {
      "u": 5,
      "front": "Muscle vs. fat: weight / density",
      "back": "Muscle: heavier / more dense\nFat: lighter / less dense"
    },
    {
      "u": 5,
      "front": "Muscle vs. fat: function",
      "back": "Muscle: moves the body and maintains posture\nFat: protection, insulation and a source of energy"
    },
    {
      "u": 5,
      "front": "Muscle vs. fat: response to exercise",
      "back": "Muscle: increases with exercise\nFat: decreases with exercise"
    },
    {
      "u": 5,
      "front": "Can fat be converted to muscle?",
      "back": "Fat can NOT be converted to muscle."
    },
    {
      "u": 5,
      "front": "BMI (Body Mass Index)",
      "back": "A measure of relative size based on the mass (weight) and height of an individual. Still widely used to screen for weight categories that may lead to health problems.",
      "simple": "A number based on your weight and height."
    },
    {
      "u": 5,
      "front": "The problem with BMI",
      "back": "BMI does not account for age, sex, ethnicity or muscle mass"
    },
    {
      "u": 5,
      "front": "Hydrostatic weighing (underwater weighing)",
      "back": "Measures body volume & body weight in water. Body volume comes from water displacement and body density from body weight in water. Known as the gold standard.",
      "simple": "Weighing you in water. The gold standard."
    },
    {
      "u": 5,
      "front": "DXA/DEXA (Dual-Energy X-ray Absorptiometry)",
      "back": "Uses x-ray technology (two beams); also used to measure bone density. One scan (5–10 min) measures bone, fat and muscle mass in each region of the body.",
      "simple": "An x-ray scan of your bone, fat and muscle."
    },
    {
      "u": 5,
      "front": "Bod Pod",
      "back": "Measures air displacement to determine body density",
      "simple": "Measures the air your body pushes away."
    },
    {
      "u": 5,
      "front": "Bioelectrical impedance",
      "back": "Measures the speed of electrical impulses sent through the body; affected by hydration status. Muscle is a better conductor than fat because skeletal muscle is more than 70% water.",
      "simple": "Sends electrical signals through your body."
    },
    {
      "u": 5,
      "front": "Skinfold calipers",
      "back": "Measures adipose tissue underneath the skin; the most inexpensive way, and fairly reliable",
      "simple": "Measures the fat under your skin. Costs the least."
    },
    {
      "u": 5,
      "front": "Recommended body fat % (ages 20–40)",
      "back": "Males: about 12–18%\nFemales: about 18–24%"
    },
    {
      "u": 5,
      "front": "When is fat cell development rapid?",
      "back": "In the first few years of life"
    },
    {
      "u": 5,
      "front": "When is fat cell number set?",
      "back": "By your early twenties. After this, they increase in size."
    },
    {
      "u": 5,
      "front": "When do fat cells increase in size?",
      "back": "When energy intake exceeds expenditure"
    },
    {
      "u": 5,
      "front": "True or false: The number of fat cells reduces in your lifetime",
      "back": "False. With fat loss, the size of fat cells shrinks, but not the number."
    },
    {
      "u": 5,
      "front": "Can fat cells increase in number again?",
      "back": "If fat cells have enlarged and energy intake keeps exceeding expenditure, fat cells can increase in number again."
    },
    {
      "u": 5,
      "front": "Why do teenage habits matter?",
      "back": "Your lifestyle and dietary habits as a teenager are factors in determining your health as an adult."
    },
    {
      "u": 6,
      "front": "Flexibility (definition)",
      "back": "The ability to move a joint through its normal range of motion (ROM)\n\nTest: Sit & reach test"
    },
    {
      "u": 6,
      "front": "Static stretch",
      "back": "Stretching a muscle and holding it still, usually 15–30 seconds\n\nExample: sitting hamstring stretch",
      "simple": "Stretch and hold still."
    },
    {
      "u": 6,
      "front": "Dynamic stretch",
      "back": "Moving parts of the body through their full range of motion in a controlled way\n\nExample: arm circles, leg swings",
      "simple": "Stretch while you move."
    },
    {
      "u": 6,
      "front": "PNF stretching",
      "back": "Stretch, contract the muscle against resistance, then relax and stretch further (often with a partner)\n\nExample: partner hamstring stretch",
      "simple": "Stretch, push against a partner, then stretch more."
    },
    {
      "u": 6,
      "front": "PNF stands for",
      "back": "Proprioceptive Neuromuscular Facilitation"
    },
    {
      "u": 6,
      "front": "Ballistic stretch",
      "back": "Bouncing or jerky movements that push a muscle past its normal range of motion\n\nExample: bouncing toe touches",
      "simple": "Bouncing stretches. They can hurt you."
    },
    {
      "u": 6,
      "front": "Best stretch for a warm-up",
      "back": "Dynamic stretching"
    },
    {
      "u": 6,
      "front": "Best stretch for a cool-down",
      "back": "Static stretching"
    },
    {
      "u": 6,
      "front": "Riskiest type of stretching",
      "back": "Ballistic stretching"
    },
    {
      "u": 6,
      "front": "How long to hold a static stretch",
      "back": "About 15–30 seconds"
    },
    {
      "u": 6,
      "front": "Benefits of good flexibility",
      "back": "Better range of motion, fewer injuries, better posture, less soreness and tightness, less lower back pain, better athletic performance"
    },
    {
      "u": 7,
      "front": "Calorie",
      "back": "A unit of energy we get from food",
      "simple": "Energy from food."
    },
    {
      "u": 7,
      "front": "Daily calorie intake is based on",
      "back": "Age, sex, height/weight and activity level"
    },
    {
      "u": 7,
      "front": "Calories for sedentary children/adolescents",
      "back": "About 1,200"
    },
    {
      "u": 7,
      "front": "Calories for active children/adolescents",
      "back": "About 2,000"
    },
    {
      "u": 7,
      "front": "Metabolism",
      "back": "All the chemical processes in the body that turn food into energy"
    },
    {
      "u": 7,
      "front": "Basal metabolic rate (BMR)",
      "back": "The calories your body burns at complete rest to keep basic functions going (breathing, heartbeat, temperature)",
      "simple": "Calories you burn just by being alive."
    },
    {
      "u": 7,
      "front": "Weight control formula",
      "back": "Calories in vs. calories out"
    },
    {
      "u": 7,
      "front": "Calories in",
      "back": "Eating and drinking. Gives the body energy (fuel)."
    },
    {
      "u": 7,
      "front": "Calories out",
      "back": "How you burn calories: BMR, daily activity and exercise"
    },
    {
      "u": 7,
      "front": "Calories in 1 pound of fat",
      "back": "3,500 calories"
    },
    {
      "u": 7,
      "front": "Safe weight loss per week",
      "back": "1–2 pounds"
    },
    {
      "u": 7,
      "front": "6 essential nutrients",
      "back": "Carbohydrates, fats, proteins, vitamins, minerals, water"
    },
    {
      "u": 7,
      "front": "Primary fuel when exercising",
      "back": "Carbohydrates (fat is secondary)"
    },
    {
      "u": 7,
      "front": "Carbohydrates",
      "back": "Sources: bread, pasta, rice, fruits, vegetables\nFunction: main source of energy\n4 calories per gram, 45–65% of the diet"
    },
    {
      "u": 7,
      "front": "Fats",
      "back": "Sources: oils, butter, nuts, meat, cheese\nFunction: stored energy, insulation, protects organs, absorbs vitamins A, D, E & K\n9 calories per gram, 20–35% of the diet"
    },
    {
      "u": 7,
      "front": "Proteins",
      "back": "Sources: meat, fish, eggs, beans, nuts, dairy\nFunction: builds and repairs muscles and tissues\n4 calories per gram, 10–35% of the diet"
    },
    {
      "u": 7,
      "front": "Calories per gram: carbs",
      "back": "4"
    },
    {
      "u": 7,
      "front": "Calories per gram: fat",
      "back": "9"
    },
    {
      "u": 7,
      "front": "Calories per gram: protein",
      "back": "4"
    },
    {
      "u": 7,
      "front": "Fat cells develop until",
      "back": "Your early twenties"
    }
  ],
  "questions": [
    {
      "u": 1,
      "t": "mc",
      "q": "What are the 4 domains of wellness?",
      "c": [
        "Physical, Emotional, Intellectual, Social",
        "Physical, Emotional, Cardiovascular, Social",
        "Strength, Endurance, Flexibility, Body Composition",
        "Frequency, Intensity, Time, Type"
      ],
      "a": 0,
      "why": "The 4 domains of wellness are Physical, Emotional, Intellectual and Social."
    },
    {
      "u": 1,
      "t": "tf",
      "q": "Physical activity enhances the intellectual, emotional AND social aspects of health.",
      "c": [
        "True",
        "False"
      ],
      "a": 0,
      "why": "Physical activity enhances all three of those aspects of health."
    },
    {
      "u": 1,
      "t": "mc",
      "q": "Which test is used for muscular strength?",
      "c": [
        "Push-up test",
        "Curl-up test",
        "PACER test",
        "Sit & reach test"
      ],
      "a": 0,
      "why": "Muscular strength uses the push-up test."
    },
    {
      "u": 1,
      "t": "mc",
      "q": "Which test is used for muscular endurance?",
      "c": [
        "Curl-up test",
        "Push-up test",
        "PACER test",
        "Sit & reach test"
      ],
      "a": 0,
      "why": "Muscular endurance uses the curl-up test."
    },
    {
      "u": 1,
      "t": "mc",
      "q": "Which test is used for cardiovascular endurance?",
      "c": [
        "PACER test",
        "Push-up test",
        "Curl-up test",
        "Sit & reach test"
      ],
      "a": 0,
      "why": "Cardiovascular endurance uses the PACER test."
    },
    {
      "u": 1,
      "t": "mc",
      "q": "Which RPE level is “borderline uncomfortable. Short of breath, can speak a sentence”?",
      "c": [
        "Vigorous activity",
        "Moderate activity"
      ],
      "a": 0,
      "why": "Moderate activity lets you hold a short conversation; vigorous activity leaves you able to speak a sentence."
    },
    {
      "u": 1,
      "t": "mc",
      "q": "Which of these is a lifetime activity?",
      "c": [
        "Golf",
        "Wrestling",
        "Agility ladders",
        "Sprinting"
      ],
      "a": 0,
      "why": "The lifetime activities are group fitness, swimming, walk/jog, tennis, biking and golf."
    },
    {
      "u": 1,
      "t": "mc",
      "q": "In a SMART goal, what does the A stand for?",
      "c": [
        "Attainable (yet challenging)",
        "Aerobic",
        "Anaerobic",
        "Adjust the machine"
      ],
      "a": 0,
      "why": "SMART is Specific (& written), Measurable, Attainable (yet challenging), Realistic, Time frame."
    },
    {
      "u": 2,
      "t": "mc",
      "q": "What is the #1 killer worldwide?",
      "c": [
        "Cardiovascular disease",
        "Obesity",
        "Smoking",
        "Stress"
      ],
      "a": 0,
      "why": "Cardiovascular disease is the #1 killer worldwide."
    },
    {
      "u": 2,
      "t": "mc",
      "q": "What is the function of the heart?",
      "c": [
        "To pump oxygenated blood to various parts of the body",
        "To store energy in the muscles",
        "To protect organs from bodily harm",
        "To move the body and maintain posture"
      ],
      "a": 0,
      "why": "The function of the heart is to pump oxygenated blood to various parts of the body."
    },
    {
      "u": 2,
      "t": "mc",
      "q": "Cardiovascular fitness can most drastically affect what?",
      "c": [
        "Life expectancy",
        "Heredity",
        "Flexibility",
        "Biological sex"
      ],
      "a": 0,
      "why": "Cardiovascular fitness can most drastically affect life expectancy."
    },
    {
      "u": 2,
      "t": "mc",
      "q": "What is a risk factor?",
      "c": [
        "A major factor in your life that would increase your risk for a premature death",
        "The maximum force a muscle group can exert",
        "A test used to measure fitness",
        "A goal with a time frame"
      ],
      "a": 0,
      "why": "A risk factor is a major factor in your life that would increase your risk for a premature death."
    },
    {
      "u": 2,
      "t": "mc",
      "q": "Which risk factor is NON-controllable?",
      "c": [
        "Heredity",
        "Smoking",
        "Inactivity",
        "High blood pressure"
      ],
      "a": 0,
      "why": "The non-controllable risk factors are biological sex, heredity and age."
    },
    {
      "u": 2,
      "t": "mc",
      "q": "Which list gives the 4 characteristics of cardiovascular activities?",
      "c": [
        "Large muscle groups, continuous, rhythmic, aerobic",
        "Small muscle groups, continuous, rhythmic, anaerobic",
        "Large muscle groups, short bursts, rhythmic, anaerobic",
        "Specific, measurable, attainable, realistic"
      ],
      "a": 0,
      "why": "The 4 characteristics are large muscle groups, continuous, rhythmic and aerobic."
    },
    {
      "u": 2,
      "t": "mc",
      "q": "What is the formula for max heart rate?",
      "c": [
        "220 − age",
        "186 − age",
        "220 + age",
        "145 + age"
      ],
      "a": 0,
      "why": "Max heart rate = 220 − age."
    },
    {
      "u": 2,
      "t": "tf",
      "q": "We want to target an INCREASED resting heart rate.",
      "c": [
        "True",
        "False"
      ],
      "a": 1,
      "why": "False: we want a lower resting heart rate."
    },
    {
      "u": 2,
      "t": "mc",
      "q": "What are the two ways to increase intensity on cardio machines?",
      "c": [
        "Increase the speed and increase the incline/resistance",
        "Increase the speed and increase the rest period",
        "Increase the time and increase the frequency",
        "Increase the reps and increase the sets"
      ],
      "a": 0,
      "why": "Increase the speed and increase the incline/resistance."
    },
    {
      "u": 2,
      "t": "mc",
      "q": "CDC recommendation: children and adolescents should get how much physical activity?",
      "c": [
        "60 minutes daily, with a minimum of 20 minutes of cardiovascular activity",
        "30 minutes daily, with a minimum of 20 minutes of cardiovascular activity",
        "60 minutes daily, with a minimum of 30 minutes of cardiovascular activity",
        "20 minutes daily, with a minimum of 3 days per week"
      ],
      "a": 0,
      "why": "The CDC says 60 minutes of physical activity daily, with a minimum of 20 minutes of cardiovascular activity."
    },
    {
      "u": 2,
      "t": "mc",
      "q": "What is the moderate to high intensity range on the FITT chart?",
      "c": [
        "145–186 BPM",
        "Less than 145 BPM",
        "186–220 BPM",
        "20–30 BPM"
      ],
      "a": 0,
      "why": "Beginner is less than 145 BPM; moderate to high is 145–186 BPM."
    },
    {
      "u": 2,
      "t": "mc",
      "q": "Fill in the blank: exercise ___ days minimum per week, at a moderate to vigorous level of intensity.",
      "c": [
        "3",
        "5",
        "7",
        "20"
      ],
      "a": 0,
      "why": "Exercise 3 days minimum per week."
    },
    {
      "u": 2,
      "t": "mc",
      "q": "Fill in the blank: exercise at a moderate to vigorous level of intensity for at least ___ minutes.",
      "c": [
        "20",
        "30",
        "60",
        "145"
      ],
      "a": 0,
      "why": "Exercise for at least 20 minutes."
    },
    {
      "u": 3,
      "t": "mc",
      "q": "How many reps are in the muscular strength protocol?",
      "c": [
        "4–8",
        "12–16",
        "3",
        "30–60"
      ],
      "a": 0,
      "why": "Strength is 4–8 reps; endurance is 12–16 reps."
    },
    {
      "u": 3,
      "t": "mc",
      "q": "What % of your 1 Rep Max do you use for muscular endurance?",
      "c": [
        "60%",
        "80%",
        "20%",
        "70%"
      ],
      "a": 0,
      "why": "Endurance uses 60% of your 1RM; strength uses 80%."
    },
    {
      "u": 3,
      "t": "tf",
      "q": "On move-in day, carrying 20 light cardboard boxes up three flights of stairs is an example of muscular endurance.",
      "c": [
        "True",
        "False"
      ],
      "a": 0,
      "why": "The boxes are endurance; lifting the heavy refrigerator off the truck is strength."
    },
    {
      "u": 3,
      "t": "mc",
      "q": "What are super sets?",
      "c": [
        "Exercising opposite muscle groups back to back",
        "A group of consecutive repetitions",
        "How many times you repeat a muscle movement",
        "The maximum weight you can lift in a single repetition"
      ],
      "a": 0,
      "why": "Super sets are opposite muscle groups back to back (e.g. pecs/lats)."
    },
    {
      "u": 3,
      "t": "mc",
      "q": "A leg shrinking after weeks in a cast is an example of what?",
      "c": [
        "Atrophy",
        "Hypertrophy",
        "Overload",
        "Progression"
      ],
      "a": 0,
      "why": "Atrophy is when muscles become smaller and weaker."
    },
    {
      "u": 3,
      "t": "mc",
      "q": "How much rest does a muscle group need between strength workouts?",
      "c": [
        "About 48 hours",
        "About 2–3 minutes",
        "About 30–60 seconds",
        "About 20 minutes"
      ],
      "a": 0,
      "why": "A muscle group needs about 48 hours of rest between strength workouts."
    },
    {
      "u": 3,
      "t": "mc",
      "q": "What are the 2 reasons proper technique is important?",
      "c": [
        "To get the desired results, and to avoid injury",
        "To lift more weight, and to finish faster",
        "To get the desired results, and to increase life expectancy",
        "To avoid injury, and to build self-esteem"
      ],
      "a": 0,
      "why": "Proper technique is to get the desired results and to avoid injury."
    },
    {
      "u": 3,
      "t": "mc",
      "q": "Which principle says the body will respond by getting stronger when increased demands are placed upon it?",
      "c": [
        "Overload principle",
        "Principle of specificity",
        "Law of Use",
        "Principle of progression"
      ],
      "a": 0,
      "why": "That is the overload principle, which must be gradual and progressive."
    },
    {
      "u": 3,
      "t": "mc",
      "q": "Milo of Croton carrying a newborn calf every day until it grew into a bull is an example of which principle?",
      "c": [
        "Principle of progression",
        "Principle of specificity",
        "Overload principle",
        "Law of Use"
      ],
      "a": 0,
      "why": "Milo is the example for the principle of progression."
    },
    {
      "u": 4,
      "t": "mc",
      "q": "Which muscle is number 6 on the chart?",
      "c": [
        "Gastrocnemius",
        "Hamstrings",
        "Quadriceps",
        "Deltoids"
      ],
      "a": 0,
      "why": "Number 6 is the gastrocnemius."
    },
    {
      "u": 4,
      "t": "mc",
      "q": "Which muscle does the leg curl work?",
      "c": [
        "Hamstrings",
        "Quadriceps",
        "Gastrocnemius",
        "Gluteus Maximus"
      ],
      "a": 0,
      "why": "Leg curl works the hamstrings."
    },
    {
      "u": 4,
      "t": "mc",
      "q": "Which muscle does the chest press work?",
      "c": [
        "Pectorals",
        "Deltoids",
        "Biceps",
        "Abdominals"
      ],
      "a": 0,
      "why": "Chest press works the pectorals."
    },
    {
      "u": 4,
      "t": "mc",
      "q": "Which muscle does the shoulder press work?",
      "c": [
        "Deltoids",
        "Trapezius",
        "Pectorals",
        "Triceps"
      ],
      "a": 0,
      "why": "Shoulder press works the deltoids."
    },
    {
      "u": 4,
      "t": "mc",
      "q": "Which muscle does the arm curl work?",
      "c": [
        "Biceps",
        "Triceps",
        "Deltoids",
        "Pectorals"
      ],
      "a": 0,
      "why": "Arm curl works the biceps."
    },
    {
      "u": 4,
      "t": "mc",
      "q": "Which muscle does the leg extension work?",
      "c": [
        "Quadriceps",
        "Hamstrings",
        "Gastrocnemius",
        "Gluteus Maximus"
      ],
      "a": 0,
      "why": "Leg extension works the quadriceps."
    },
    {
      "u": 4,
      "t": "mc",
      "q": "Which muscles does the leg press work?",
      "c": [
        "Gluteus maximus and quadriceps",
        "Hamstrings and gastrocnemius",
        "Quadriceps and abdominals",
        "Gluteus maximus and hamstrings"
      ],
      "a": 0,
      "why": "Leg press works the gluteus maximus and quadriceps."
    },
    {
      "u": 4,
      "t": "mc",
      "q": "Which muscle do shoulder shrugs work?",
      "c": [
        "Trapezius",
        "Deltoids",
        "Pectorals",
        "Triceps"
      ],
      "a": 0,
      "why": "Shoulder shrugs work the trapezius, in the upper back."
    },
    {
      "u": 4,
      "t": "mc",
      "q": "Which muscle does the seated row work?",
      "c": [
        "Latissimus dorsi",
        "Biceps",
        "Abdominals",
        "Hamstrings"
      ],
      "a": 0,
      "why": "The seated row works the latissimus dorsi (lats), in the back."
    },
    {
      "u": 4,
      "t": "mc",
      "q": "Which muscle does the arm extension work?",
      "c": [
        "Triceps",
        "Biceps",
        "Deltoids",
        "Trapezius"
      ],
      "a": 0,
      "why": "The arm extension works the triceps, on the back of the upper arm. The arm curl works the biceps."
    },
    {
      "u": 4,
      "t": "mc",
      "q": "Which muscle do heel raises work?",
      "c": [
        "Gastrocnemius",
        "Quadriceps",
        "Hamstrings",
        "Gluteus maximus"
      ],
      "a": 0,
      "why": "Heel raises work the gastrocnemius, the calf on the back of the lower leg."
    },
    {
      "u": 4,
      "t": "tf",
      "q": "Lunges and the leg press both work the gluteus maximus.",
      "c": [
        "True",
        "False"
      ],
      "a": 0,
      "why": "True: the study guide lists lunges and the leg press for the gluteals."
    },
    {
      "u": 5,
      "t": "mc",
      "q": "A person weighs 150 lbs with 20% body fat. What are their fat weight and fat-free weight?",
      "c": [
        "30 lbs fat weight and 120 lbs fat-free weight",
        "20 lbs fat weight and 130 lbs fat-free weight",
        "120 lbs fat weight and 30 lbs fat-free weight",
        "50 lbs fat weight and 100 lbs fat-free weight"
      ],
      "a": 0,
      "why": "150 lb body weight × 20% body fat = 30 lbs fat weight and 120 lbs fat-free weight."
    },
    {
      "u": 5,
      "t": "mc",
      "q": "Body fat absorbs which fat-soluble vitamins?",
      "c": [
        "A, D, E & K",
        "A, B, C & D",
        "B, C, E & K",
        "A, C, D & E"
      ],
      "a": 0,
      "why": "One function of body fat is absorption of fat-soluble vitamins (A, D, E & K)."
    },
    {
      "u": 5,
      "t": "mc",
      "q": "Which type of fat is usually the first to be lost in weight loss?",
      "c": [
        "Visceral",
        "Subcutaneous"
      ],
      "a": 0,
      "why": "Visceral fat is usually the first fat to be lost in weight loss."
    },
    {
      "u": 5,
      "t": "tf",
      "q": "Fat can be converted to muscle.",
      "c": [
        "True",
        "False"
      ],
      "a": 1,
      "why": "False: fat can NOT be converted to muscle. They are two different tissues."
    },
    {
      "u": 5,
      "t": "mc",
      "q": "What is the problem with BMI?",
      "c": [
        "It does not account for age, sex, ethnicity or muscle mass",
        "It does not use height",
        "It does not use weight",
        "It is no longer used"
      ],
      "a": 0,
      "why": "BMI does not account for age, sex, ethnicity or muscle mass."
    },
    {
      "u": 5,
      "t": "mc",
      "q": "Which measurement method is known as the gold standard?",
      "c": [
        "Hydrostatic weighing",
        "DXA/DEXA",
        "Bod Pod",
        "Skinfold calipers"
      ],
      "a": 0,
      "why": "Hydrostatic (underwater) weighing is known as the gold standard."
    },
    {
      "u": 5,
      "t": "mc",
      "q": "Which method is the most inexpensive way?",
      "c": [
        "Skinfold calipers",
        "Hydrostatic weighing",
        "DXA/DEXA",
        "Bod Pod"
      ],
      "a": 0,
      "why": "Skinfold calipers are the most inexpensive way, and fairly reliable."
    },
    {
      "u": 5,
      "t": "mc",
      "q": "What is the recommended body fat % for females ages 20–40?",
      "c": [
        "About 18–24%",
        "About 12–18%",
        "About 20–40%",
        "About 24–30%"
      ],
      "a": 0,
      "why": "Males are about 12–18% and females are about 18–24%."
    },
    {
      "u": 5,
      "t": "mc",
      "q": "Fat cell number is set by when?",
      "c": [
        "Your early twenties",
        "The first few years of life",
        "Your teenage years",
        "Ages 20–40"
      ],
      "a": 0,
      "why": "Fat cell number is set by your early twenties. After this, they increase in size."
    },
    {
      "u": 5,
      "t": "tf",
      "q": "The number of fat cells reduces in your lifetime.",
      "c": [
        "True",
        "False"
      ],
      "a": 1,
      "why": "False: with fat loss, the size of fat cells shrinks, but not the number."
    },
    {
      "u": 6,
      "t": "mc",
      "q": "What is flexibility?",
      "c": [
        "The ability to move a joint through its normal range of motion",
        "The maximum force a muscle can exert",
        "The ability of the heart and lungs to supply oxygen",
        "The ratio of body fat to lean body mass"
      ],
      "a": 0,
      "why": "Flexibility is the ability to move a joint through its normal range of motion (ROM)."
    },
    {
      "u": 6,
      "t": "mc",
      "q": "Which fitness test measures flexibility?",
      "c": [
        "Sit & reach test",
        "PACER test",
        "Push-up test",
        "Curl-up test"
      ],
      "a": 0,
      "why": "The sit & reach test measures flexibility."
    },
    {
      "u": 6,
      "t": "mc",
      "q": "Which type of stretch is held still in one position for 15–30 seconds?",
      "c": [
        "Static",
        "Dynamic",
        "Ballistic",
        "PNF"
      ],
      "a": 0,
      "why": "A static stretch is held still in one position."
    },
    {
      "u": 6,
      "t": "mc",
      "q": "Arm circles and leg swings are examples of which type of stretch?",
      "c": [
        "Dynamic",
        "Static",
        "Ballistic",
        "PNF"
      ],
      "a": 0,
      "why": "Dynamic stretches move the body through its range of motion in a controlled way."
    },
    {
      "u": 6,
      "t": "mc",
      "q": "Which type of stretching uses a contract-then-relax pattern, often with a partner?",
      "c": [
        "PNF",
        "Static",
        "Dynamic",
        "Ballistic"
      ],
      "a": 0,
      "why": "PNF stretching: stretch, contract against resistance, then relax and stretch further."
    },
    {
      "u": 6,
      "t": "mc",
      "q": "Which type of stretching uses bouncing and has the highest risk of injury?",
      "c": [
        "Ballistic",
        "Static",
        "Dynamic",
        "PNF"
      ],
      "a": 0,
      "why": "Ballistic stretching uses bouncing movements that push past the normal range of motion."
    },
    {
      "u": 6,
      "t": "mc",
      "q": "Which type of stretching is best for a warm-up?",
      "c": [
        "Dynamic",
        "Static",
        "Ballistic",
        "None"
      ],
      "a": 0,
      "why": "Dynamic stretching gets the muscles moving before exercise. Static stretching fits the cool-down."
    },
    {
      "u": 6,
      "t": "tf",
      "q": "Good flexibility can lower your risk of injury and lower back pain.",
      "c": [
        "True",
        "False"
      ],
      "a": 0,
      "why": "True: those are two benefits of good flexibility."
    },
    {
      "u": 7,
      "t": "mc",
      "q": "What is a calorie?",
      "c": [
        "A unit of energy we get from food",
        "A type of fat",
        "A vitamin found in food",
        "A measure of body fat"
      ],
      "a": 0,
      "why": "A calorie is a unit of energy we get from food."
    },
    {
      "u": 7,
      "t": "mc",
      "q": "Which is NOT one of the things daily calorie intake should be based on?",
      "c": [
        "Eye color",
        "Age",
        "Activity level",
        "Height/weight"
      ],
      "a": 0,
      "why": "Daily calorie intake is based on age, sex, height/weight and activity level."
    },
    {
      "u": 7,
      "t": "mc",
      "q": "What is basal metabolic rate (BMR)?",
      "c": [
        "The calories your body burns at rest",
        "The calories you burn during exercise",
        "How fast your heart beats",
        "The calories in one meal"
      ],
      "a": 0,
      "why": "BMR is the number of calories your body burns at complete rest to keep basic functions going."
    },
    {
      "u": 7,
      "t": "mc",
      "q": "What is the weight control formula?",
      "c": [
        "Calories in vs. calories out",
        "220 − age",
        "Body weight × body fat %",
        "Carbs + fats + proteins"
      ],
      "a": 0,
      "why": "Weight control comes down to calories in vs. calories out."
    },
    {
      "u": 7,
      "t": "mc",
      "q": "How many calories are in one pound of fat?",
      "c": [
        "3,500",
        "1,200",
        "2,000",
        "500"
      ],
      "a": 0,
      "why": "One pound of fat is 3,500 calories."
    },
    {
      "u": 7,
      "t": "mc",
      "q": "What is the recommended amount of safe, long-term weight loss per week?",
      "c": [
        "1–2 pounds",
        "5–6 pounds",
        "10 pounds",
        "Half a pound per day"
      ],
      "a": 0,
      "why": "Safe, long-term weight loss is 1–2 pounds per week."
    },
    {
      "u": 7,
      "t": "mc",
      "q": "Which is NOT one of the six essential nutrients?",
      "c": [
        "Sugar",
        "Water",
        "Minerals",
        "Proteins"
      ],
      "a": 0,
      "why": "The six essential nutrients are carbohydrates, fats, proteins, vitamins, minerals and water."
    },
    {
      "u": 7,
      "t": "mc",
      "q": "What is the primary fuel source when exercising?",
      "c": [
        "Carbohydrates",
        "Fat",
        "Protein",
        "Water"
      ],
      "a": 0,
      "why": "Carbohydrates are the primary fuel when exercising. Fat is secondary."
    },
    {
      "u": 7,
      "t": "mc",
      "q": "How many calories are in one gram of fat?",
      "c": [
        "9",
        "4",
        "7",
        "2"
      ],
      "a": 0,
      "why": "Fat has 9 calories per gram. Carbohydrates and protein each have 4."
    },
    {
      "u": 7,
      "t": "mc",
      "q": "What is the main function of protein?",
      "c": [
        "Builds and repairs muscles and tissues",
        "The body’s main source of energy",
        "Insulation and protecting organs",
        "Keeps you hydrated"
      ],
      "a": 0,
      "why": "Protein builds and repairs muscles and other tissues."
    },
    {
      "u": 7,
      "t": "mc",
      "q": "Which nutrient is the body’s main source of energy?",
      "c": [
        "Carbohydrates",
        "Proteins",
        "Fats",
        "Minerals"
      ],
      "a": 0,
      "why": "Carbohydrates are the body’s main source of energy."
    },
    {
      "u": 7,
      "t": "mc",
      "q": "You ate a snack with 4 grams of carbs and 2 grams of fat. How many calories did you consume?",
      "c": [
        "34",
        "24",
        "54",
        "12"
      ],
      "a": 0,
      "why": "4 × 4 = 16 calories from carbs, plus 2 × 9 = 18 calories from fat. 16 + 18 = 34."
    },
    {
      "u": 7,
      "t": "tf",
      "q": "If you eat more calories than you burn, you will gain weight.",
      "c": [
        "True",
        "False"
      ],
      "a": 0,
      "why": "True: more calories in than out leads to weight gain."
    }
  ],
  "muscles": [
    {
      "id": "trapezius",
      "n": 1,
      "name": "Trapezius",
      "view": "Back"
    },
    {
      "id": "triceps",
      "n": 2,
      "name": "Triceps",
      "view": "Back"
    },
    {
      "id": "lats",
      "n": 3,
      "name": "Latissimus Dorsi",
      "view": "Back"
    },
    {
      "id": "glutes",
      "n": 4,
      "name": "Gluteus Maximus",
      "view": "Back"
    },
    {
      "id": "hamstrings",
      "n": 5,
      "name": "Hamstrings",
      "view": "Back"
    },
    {
      "id": "gastrocnemius",
      "n": 6,
      "name": "Gastrocnemius",
      "view": "Back"
    },
    {
      "id": "deltoids",
      "n": 7,
      "name": "Deltoids",
      "view": "Front"
    },
    {
      "id": "pectorals",
      "n": 8,
      "name": "Pectorals",
      "view": "Front"
    },
    {
      "id": "abdominals",
      "n": 9,
      "name": "Abdominals",
      "view": "Front"
    },
    {
      "id": "biceps",
      "n": 10,
      "name": "Biceps",
      "view": "Front"
    },
    {
      "id": "quadriceps",
      "n": 11,
      "name": "Quadriceps",
      "view": "Front"
    }
  ],
  "machines": [
    {
      "id": "leg-curl",
      "name": "Leg curl",
      "works": "Hamstrings",
      "muscles": [
        "hamstrings"
      ]
    },
    {
      "id": "chest-press",
      "name": "Chest press",
      "works": "Pectorals",
      "muscles": [
        "pectorals"
      ]
    },
    {
      "id": "shoulder-press",
      "name": "Shoulder press",
      "works": "Deltoids",
      "muscles": [
        "deltoids"
      ]
    },
    {
      "id": "arm-curl",
      "name": "Arm curl",
      "works": "Biceps",
      "muscles": [
        "biceps"
      ]
    },
    {
      "id": "leg-extension",
      "name": "Leg extension",
      "works": "Quadriceps",
      "muscles": [
        "quadriceps"
      ]
    },
    {
      "id": "leg-press",
      "name": "Leg press",
      "works": "Gluteus maximus and quadriceps",
      "muscles": [
        "glutes",
        "quadriceps"
      ]
    },
    {
      "id": "shoulder-shrugs",
      "name": "Shoulder shrugs",
      "works": "Trapezius",
      "muscles": [
        "trapezius"
      ]
    },
    {
      "id": "seated-row",
      "name": "Seated row",
      "works": "Latissimus dorsi",
      "muscles": [
        "lats"
      ]
    },
    {
      "id": "arm-extension",
      "name": "Arm extension",
      "works": "Triceps",
      "muscles": [
        "triceps"
      ]
    },
    {
      "id": "lunges",
      "name": "Lunges",
      "works": "Gluteus maximus",
      "muscles": [
        "glutes"
      ]
    },
    {
      "id": "heel-raises",
      "name": "Heel raises",
      "works": "Gastrocnemius",
      "muscles": [
        "gastrocnemius"
      ]
    }
  ],
  "activities": [
    {
      "name": "Biking",
      "bin": "aerobic"
    },
    {
      "name": "Swimming",
      "bin": "aerobic"
    },
    {
      "name": "Rollerblading",
      "bin": "aerobic"
    },
    {
      "name": "Cross-country running",
      "bin": "aerobic"
    },
    {
      "name": "Sprinting",
      "bin": "anaerobic"
    },
    {
      "name": "Agility ladders",
      "bin": "anaerobic"
    },
    {
      "name": "Tennis",
      "bin": "anaerobic"
    },
    {
      "name": "Wrestling",
      "bin": "anaerobic"
    }
  ],
  "methods": [
    {
      "id": "hydro",
      "icon": "i-hydro",
      "name": "Hydrostatic weighing",
      "desc": "Measures body volume & body weight in water. Body volume comes from water displacement and body density from body weight in water. Known as the gold standard."
    },
    {
      "id": "dxa",
      "icon": "i-dxa",
      "name": "DXA/DEXA",
      "desc": "Uses x-ray technology (two beams); also used to measure bone density. One scan (5–10 min) measures bone, fat and muscle mass in each region of the body."
    },
    {
      "id": "bodpod",
      "icon": "i-bodpod",
      "name": "Bod Pod",
      "desc": "Measures air displacement to determine body density."
    },
    {
      "id": "bia",
      "icon": "i-bia",
      "name": "Bioelectrical impedance",
      "desc": "Measures the speed of electrical impulses sent through the body; affected by hydration status. Muscle is a better conductor than fat because skeletal muscle is more than 70% water."
    },
    {
      "id": "skinfold",
      "icon": "i-skinfold",
      "name": "Skinfold calipers",
      "desc": "Measures adipose tissue underneath the skin; the most inexpensive way, and fairly reliable."
    }
  ],
  "plainMuscles": {
    "trapezius": "Upper back and neck",
    "triceps": "Back of the upper arm",
    "lats": "Sides of the back",
    "glutes": "Buttocks",
    "hamstrings": "Back of the thigh",
    "gastrocnemius": "Calf",
    "deltoids": "Shoulders",
    "pectorals": "Chest",
    "abdominals": "Stomach",
    "biceps": "Front of the upper arm",
    "quadriceps": "Front of the thigh"
  }
}, {
  formulas: [["Max heart rate","220 − age"],["Endurance load","1 Rep Max × 0.6 (60%)"],["Strength load","1 Rep Max × 0.8 (80%)"],["Fat weight","body weight × body fat %"],["Fat-free weight","body weight − fat weight"],["Calories from food","carbs (g) × 4 + protein (g) × 4 + fat (g) × 9"],["Weight loss","1 pound of fat = 3,500 calories"]],
  drills: [
    // Numbers are picked so every answer comes out whole.
    {
      tag: 'Max heart rate', unit: 'BPM',
      make: function (rand) {
        var age = rand(12, 60);
        return { q: 'What is the max heart rate for a ' + age + '-year-old?', answer: 220 - age,
          work: '220 − age = 220 − ' + age + ' = ' + (220 - age) + ' BPM' };
      }
    },
    {
      tag: '1 Rep Max', unit: 'lbs',
      make: function (rand) {
        var orm = 5 * rand(8, 60);
        var strong = rand(0, 1) === 1;
        var load = orm * (strong ? 8 : 6) / 10;
        return { q: 'Your 1 Rep Max is ' + orm + ' lbs. What load do you train with for muscular ' + (strong ? 'strength' : 'endurance') + '?', answer: load,
          work: (strong ? 'Strength uses 80%' : 'Endurance uses 60%') + ' of your 1RM: ' + orm + ' × ' + (strong ? '0.8' : '0.6') + ' = ' + load + ' lbs' };
      }
    },
    {
      tag: 'Body composition', unit: 'lbs',
      make: function (rand) {
        var weight = 20 * rand(5, 12);
        var fatPct = 5 * rand(2, 8);
        var fat = weight * fatPct / 100;
        if (rand(0, 1)) {
          return { q: 'A person weighs ' + weight + ' lbs with ' + fatPct + '% body fat. What is their fat weight?', answer: fat,
            work: weight + ' × ' + fatPct + '% = ' + fat + ' lbs of fat weight' };
        }
        return { q: 'A person weighs ' + weight + ' lbs with ' + fatPct + '% body fat. What is their fat-free weight?', answer: weight - fat,
          work: 'Fat weight: ' + weight + ' × ' + fatPct + '% = ' + fat + ' lbs. Fat-free weight: ' + weight + ' − ' + fat + ' = ' + (weight - fat) + ' lbs' };
      }
    },
    {
      tag: 'Calories in food', unit: 'calories',
      make: function (rand) {
        var carbs = rand(2, 30), protein = rand(0, 15), fat = rand(1, 12);
        var total = carbs * 4 + protein * 4 + fat * 9;
        return { q: 'A snack has ' + carbs + ' g of carbs, ' + protein + ' g of protein and ' + fat + ' g of fat. How many calories is it?', answer: total,
          work: carbs + ' × 4 + ' + protein + ' × 4 + ' + fat + ' × 9 = ' + (carbs * 4) + ' + ' + (protein * 4) + ' + ' + (fat * 9) + ' = ' + total + ' calories' };
      }
    },
    {
      tag: 'Weight loss', unit: 'calories',
      make: function (rand) {
        var lbs = rand(1, 10);
        return { q: 'How many calories have to be burned to lose ' + lbs + (lbs === 1 ? ' pound' : ' pounds') + ' of fat?', answer: lbs * 3500,
          work: lbs + ' × 3,500 = ' + (lbs * 3500).toLocaleString('en-US') + ' calories' };
      }
    }
  ]
}));
