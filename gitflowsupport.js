// From http://gitgraphjs.com/examples/gitflowsupport.html
// http://gitgraphjs.com/

var graphConfig = new GitGraph.Template({
    colors: ["#6297ff", "#47E8D4", "#E84BA5", "#FFA657"],
    branch: {
        color: "#000000",
        lineWidth: 3,
        spacingX: 90,
        mergeStyle: "straight",
        showLabel: true,
        labelFont: "normal 12pt Arial",
        labelRotation: 0
    },
    commit: {
        spacingY: -50,
        dot: {
            size: 10,
            strokeColor: "#000000",
            strokeWidth: 4
        },
        tag: {
            font: "normal 12pt Arial",
            color: "yellow"
        },
        message: {
            color: "black",
            font: "normal 12pt Arial",
            displayAuthor: false,
            displayBranch: false,
            displayHash: false,
          },
          tooltipHTMLFormatter: function (commit) {
            return commit.message
          }
        },
    arrow: {
        size: 7,
        offset: 1
    }
})

var config = {
  template: graphConfig,
  mode: "extended",
  orientation: "horizontal"
}

// You can manually fix columns to control the display.
var featureCol = 0
var developCol = 1
var hfCol = 2
var masterCol = 3

var gitgraph = new GitGraph(config)

var master = gitgraph.branch({name:"master", column:masterCol})
master.commit("Initial commit")

var develop = gitgraph.branch({parentBranch:master, name: "develop", column:developCol})
develop.commit("Develop branch creation")

var feature1 = gitgraph.branch({parentBranch:develop, name:"DEV-001-Ex1", column:featureCol})
feature1.commit("A feature to go into 19.2.0")
feature1.merge(develop)

var feature2 = gitgraph.branch({parentBranch:develop, name:"DEV-002-Ex2", column:featureCol})
feature2.commit("Another feature to go into 19.2.0")
feature2.commit("Fix to Another feature to go into 19.2.0")
feature2.merge(develop)

develop.merge(master, {message: "Release 19.2.0", tag:"19.2.0"})

var hotfix_10x = gitgraph.branch({parentBranch: master, name: "hf-003-Ex3", column:hfCol})
hotfix_10x.commit("Urgent Fix 1")
hotfix_10x.commit("Urgent Fix 2")

var feature3 = gitgraph.branch({parentBranch:develop, name:"DEV-004-Ex4", column:featureCol})
feature3.commit("A feature to go into 19.3.0")

var feature4 = gitgraph.branch({parentBranch:develop, name:"DEV-005-Ex5", column:featureCol})
feature3.merge(develop)

feature4.commit("A feature to go into 19.3.0")
feature4.commit("Another feature to go into 19.3.0")
develop.merge(feature4)
feature4.merge(develop)

hotfix_10x.merge(develop).merge(master, {message: "Release 19.2.0-1", tag:"19.2.0-1"})

var feature5 = gitgraph.branch({parentBranch:develop, name:"DEV-006-Ex6", column:featureCol})
feature5.commit("A feature to go into 19.3.0")
feature5.merge(develop)

develop.merge(master, {message: "Release 19.3.0", tag:"19.3.0"})