src/app/api/call-records-upload/route.ts






import { NextResponse } from "next/server";

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
    },
  });
}

export async function POST(request: Request) {
  console.log('POST request received to call-records-upload');
  
  try {
    const { searchParams } = new URL(request.url);
    const memberId = searchParams.get('memberId');
    const teamId = searchParams.get('teamId');
    
    if (!memberId) {
      console.log('Missing memberId parameter');
      return NextResponse.json({
        error: 'Missing memberId parameter'
      }, { status: 400 });
    }
    
    console.log('memberId:', memberId);
    
    // Parse the request body as JSON
    let requestBody;
    try {
      requestBody = await request.json();
      console.log('Request body parsed');
    } catch (error) {
      console.error('Error parsing request body:', error);
      return NextResponse.json({
        error: 'Invalid request body'
      }, { status: 400 });
    }
    
    // Now we only handle link submissions
    if (!requestBody.url) {
      return NextResponse.json({
        error: 'Missing URL'
      }, { status: 400 });
    }
    
    // Create the payload
    const payload = {
      type: 'link',
      url: requestBody.url,
      notes: requestBody.notes || '',
      memberId,
      created_at: new Date().toISOString()
    };
    
    // Include teamId if available
    if (teamId || requestBody.teamId) {
      payload.teamId = teamId || requestBody.teamId;
    }

    console.log('Sending payload to webhook:', {
      url: payload.url,
      memberId: payload.memberId,
      teamId: payload.teamId
    });

    try {
      // Send to the webhook URL
      const webhookUrl = 'https://aiemployee.app.n8n.cloud/webhook/50342a33-bf54-4310-b88b-b41e08c0ad7d';
      console.log('Sending to webhook URL:', webhookUrl);
      
      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      console.log('Webhook response status:', webhookResponse.status);
      
      if (!webhookResponse.ok) {
        const responseText = await webhookResponse.text();
        console.error('Webhook error response:', responseText);
        return NextResponse.json({
          error: `Webhook error: ${webhookResponse.status}`,
          details: responseText
        }, { 
          status: webhookResponse.status,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          }
        });
      }

      console.log('Webhook request successful');
      return NextResponse.json({
        message: 'Call record link submitted successfully',
        status: 'success'
      }, { 
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      });
    } catch (error) {
      console.error('Error sending to webhook:', error);
      return NextResponse.json({
        error: 'Failed to submit call record link',
        details: error.message || 'Unknown error'
      }, { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      });
    }
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({
      error: 'Failed to process call record link',
      details: error.message || 'Unknown error'
    }, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    });
  }
}
