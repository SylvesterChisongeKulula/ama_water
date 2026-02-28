<template>
    <EHtml lang="en">
        <EHead />
        <EPreview>New Contact Form Submission from {{ name }}</EPreview>
        <EBody :style="main">
            <EContainer :style="container">
                <EImg src="https://amawater.com/logo.png" width="150" alt="AMA Water" :style="logo" />
                <ESection :style="section">
                    <EText :style="heading">New Contact Request</EText>
                    <EText :style="text">
                        <strong>Name:</strong> {{ name }}<br />
                        <strong>Email:</strong> {{ email }}
                    </EText>
                    <EHr :style="hr" />
                    <EText :style="heading2">Message:</EText>
                    <EText :style="messageText">{{ message }}</EText>
                </ESection>
                <EText :style="footer">
                    This is an automated message from the AMA Water website contact form.
                </EText>
            </EContainer>
        </EBody>
    </EHtml>
</template>

<script setup lang="ts">
defineProps<{
    name: string
    email: string
    message: string
}>()

const main = {
    backgroundColor: '#f6f9fc',
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
}

const logo = {
    margin: '0 auto',
    marginBottom: '24px',
}

const section = {
    padding: '0 48px',
}

const heading = {
    fontSize: '24px',
    letterSpacing: '-0.5px',
    lineHeight: '1.3',
    fontWeight: '400',
    color: '#484848',
    padding: '17px 0 0',
}

const heading2 = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#484848',
}

const text = {
    color: '#525f7f',
    fontSize: '16px',
    lineHeight: '24px',
    textAlign: 'left' as const,
}

const messageText = {
    color: '#525f7f',
    fontSize: '16px',
    lineHeight: '26px',
    backgroundColor: '#f4f6f8',
    padding: '16px',
    borderRadius: '4px',
    whiteSpace: 'pre-wrap',
}

const hr = {
    borderColor: '#e6ebf1',
    margin: '20px 0',
}

const footer = {
    color: '#8898aa',
    fontSize: '12px',
    lineHeight: '16px',
    padding: '0 48px',
    marginTop: '24px',
}
</script>
