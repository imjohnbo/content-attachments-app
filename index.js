/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!')

  app.on('issues.opened', async context => {
    const issueComment = context.issue({ body: 'Thanks for opening this issue!' })
    return context.github.issues.createComment(issueComment)
  })

  app.on('content_reference.created', async context => {
    console.log('Content reference created!', context.payload)
     // Call the "Create a content reference" REST endpoint
    await context.github.request({
      method: 'POST',
      headers: { accept: 'application/vnd.github.corsair-preview+json' },
      url: `/content_references/${context.payload.content_reference.id}/attachments`,
      // Parameters
      title: '[EXAMPLE] Example title',
      body: 'Example body **with** some _Markdown_'
    })

    await context.github.request({
      method: 'POST',
      headers: { accept: 'application/vnd.github.corsair-preview+json' },
      url: `/content_references/${context.payload.content_reference.id}/attachments`,
      // Parameters
      title: '[EXAMPLE] Example title 2',
      body: 'Example body **with** some _Markdown_ 2'
    })
  })

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}